import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Mic, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProctoringSystemProps {
  onProctoringData: (data: any) => void;
  isActive: boolean;
}

export const ProctoringSystem: React.FC<ProctoringSystemProps> = ({ onProctoringData, isActive }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [proctoringData, setProctoringData] = useState({
    faceDetected: false,
    multipleFaces: false,
    headTurns: 0,
    audioLevel: 0,
    tabSwitches: 0,
    riskScore: 0,
    alerts: [] as string[]
  });
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false
  });

  useEffect(() => {
    if (isActive) {
      initializeProctoring();
      setupBehaviorTracking();
    } else {
      cleanup();
    }

    return () => cleanup();
  }, [isActive]);

  // Send proctoring data updates to parent component
  useEffect(() => {
    onProctoringData(proctoringData);
  }, [proctoringData, onProctoringData]);

  const initializeProctoring = async () => {
    try {
      // Request camera and microphone permissions
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true
      });

      setStream(mediaStream);
      setPermissions({ camera: true, microphone: true });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      // Start face detection
      startFaceDetection();
      // Start audio analysis
      startAudioAnalysis(mediaStream);

    } catch (error) {
      console.error('Error accessing media devices:', error);
      setPermissions({ camera: false, microphone: false });
    }
  };

  const startFaceDetection = async () => {
    // Simplified face detection using basic computer vision
    // In production, you would use TensorFlow.js with a proper face detection model
    
    const detectFaces = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      // Simulate face detection (in production, use actual ML models)
      const mockFaceDetection = {
        faceDetected: Math.random() > 0.1, // 90% chance face is detected
        multipleFaces: Math.random() > 0.9, // 10% chance multiple faces
        headTurn: Math.random() > 0.8 // 20% chance head turn detected
      };

      setProctoringData(prev => {
        const newData = {
          ...prev,
          faceDetected: mockFaceDetection.faceDetected,
          multipleFaces: mockFaceDetection.multipleFaces,
          headTurns: mockFaceDetection.headTurn ? prev.headTurns + 1 : prev.headTurns
        };

        // Calculate risk score
        newData.riskScore = calculateRiskScore(newData);
        
        // Generate alerts
        newData.alerts = generateAlerts(newData);

        return newData;
      });
    };

    // Run face detection every 2 seconds
    const interval = setInterval(detectFaces, 2000);
    return () => clearInterval(interval);
  };

  const startAudioAnalysis = (mediaStream: MediaStream) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(mediaStream);
      
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
      
      microphone.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const analyzeAudio = () => {
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate average audio level
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        
        setProctoringData(prev => ({
          ...prev,
          audioLevel: average
        }));

        // Check for suspicious audio patterns
        if (average > 50) { // Threshold for voice detection
          setProctoringData(prev => ({
            ...prev,
            alerts: [...prev.alerts.filter(a => a !== 'Voice detected'), 'Voice detected']
          }));
        }
      };

      const interval = setInterval(analyzeAudio, 1000);
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error setting up audio analysis:', error);
    }
  };

  const setupBehaviorTracking = () => {
    // Track tab switches
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setProctoringData(prev => ({
          ...prev,
          tabSwitches: prev.tabSwitches + 1,
          alerts: [...prev.alerts, 'Tab switch detected']
        }));
      }
    };

    // Track window focus
    const handleBlur = () => {
      setProctoringData(prev => ({
        ...prev,
        alerts: [...prev.alerts, 'Window lost focus']
      }));
    };

    // Track right-click (context menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setProctoringData(prev => ({
        ...prev,
        alerts: [...prev.alerts, 'Right-click attempted']
      }));
    };

    // Track keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const suspiciousKeys = ['F12', 'F11', 'PrintScreen'];
      const suspiciousCombos = [
        e.ctrlKey && e.shiftKey && e.key === 'I', // Developer tools
        e.ctrlKey && e.shiftKey && e.key === 'J', // Console
        e.ctrlKey && e.key === 'u', // View source
        e.altKey && e.key === 'Tab' // Alt+Tab
      ];

      if (suspiciousKeys.includes(e.key) || suspiciousCombos.some(combo => combo)) {
        e.preventDefault();
        setProctoringData(prev => ({
          ...prev,
          alerts: [...prev.alerts, `Suspicious key combination: ${e.key}`]
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  };

  const calculateRiskScore = (data: any) => {
    let score = 0;
    
    if (!data.faceDetected) score += 20;
    if (data.multipleFaces) score += 30;
    if (data.headTurns > 5) score += 15;
    if (data.tabSwitches > 0) score += 25;
    if (data.audioLevel > 50) score += 10;
    
    return Math.min(score, 100);
  };

  const generateAlerts = (data: any) => {
    const alerts = [];
    
    if (!data.faceDetected) alerts.push('No face detected');
    if (data.multipleFaces) alerts.push('Multiple faces detected');
    if (data.headTurns > 10) alerts.push('Excessive head movement');
    if (data.tabSwitches > 3) alerts.push('Multiple tab switches');
    
    return alerts;
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'default' };
    if (score < 70) return { level: 'Medium', color: 'destructive' };
    return { level: 'High', color: 'destructive' };
  };

  const riskLevel = getRiskLevel(proctoringData.riskScore);

  return (
    <div className={`bg-white rounded-lg shadow-lg border transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      {/* Compact Header */}
      <div className="flex items-center justify-between p-3 border-b bg-red-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-red-700">PROCTORING</span>
          </div>
          <Badge variant={riskLevel.color as any} className="text-xs">
            {riskLevel.level} Risk
          </Badge>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          {isMinimized ? '▲' : '▼'}
        </button>
      </div>

      {/* Status Indicators */}
      <div className="p-3">
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className={`flex items-center gap-1 ${permissions.camera ? 'text-green-600' : 'text-red-600'}`}>
            <Camera className="h-3 w-3" />
            <span>Cam</span>
          </div>
          <div className={`flex items-center gap-1 ${permissions.microphone ? 'text-green-600' : 'text-red-600'}`}>
            <Mic className="h-3 w-3" />
            <span>Mic</span>
          </div>
          <div className={`flex items-center gap-1 ${proctoringData.faceDetected ? 'text-green-600' : 'text-red-600'}`}>
            <Eye className="h-3 w-3" />
            <span>Face</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>{proctoringData.riskScore}</span>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      {!isMinimized && (
        <div className="border-t">
          {/* Compact Video Feed */}
          <div className="p-3">
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-32 bg-black rounded object-cover"
                autoPlay
                muted
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute top-1 right-1">
                <Badge variant="destructive" className="text-xs bg-red-500">
                  REC
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="px-3 pb-3">
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Head Turns:</span>
                <span>{proctoringData.headTurns}</span>
              </div>
              <div className="flex justify-between">
                <span>Tab Switches:</span>
                <span>{proctoringData.tabSwitches}</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          {proctoringData.alerts.length > 0 && (
            <div className="border-t px-3 py-2">
              <div className="text-xs font-medium text-orange-600 mb-1">Recent Alert:</div>
              <div className="text-xs text-orange-700 bg-orange-50 p-2 rounded">
                {proctoringData.alerts[proctoringData.alerts.length - 1]}
              </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="border-t p-3 bg-gray-50">
            <div className="text-xs text-gray-600">
              <div className="font-medium mb-1">Guidelines:</div>
              <ul className="space-y-0.5">
                <li>• Face visible at all times</li>
                <li>• No tab switching</li>
                <li>• Minimal noise</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};