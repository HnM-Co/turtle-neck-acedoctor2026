import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Share2, AlertCircle, RefreshCcw, CheckCircle2, XCircle, MousePointer2,
  Link, X, MessageCircle, Twitter, Instagram, Copy, Image as ImageIcon
} from 'lucide-react';

// Type definitions for MediaPipe globals
declare global {
  interface Window {
    Pose: any;
    drawConnectors: any;
    drawLandmarks: any;
    POSE_CONNECTIONS: any;
  }
}

// --- Turtle Character Component ---
const TurtleCharacter = ({ level, className }: { level: number, className?: string }) => {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skin-gradient" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stopColor="#d9f99d" />
           <stop offset="100%" stopColor="#84cc16" />
        </linearGradient>
        
        <linearGradient id="shell-gold" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stopColor="#fcd34d" />
           <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        <linearGradient id="shell-green" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stopColor="#86efac" />
           <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>

         <linearGradient id="shell-brown" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stopColor="#d97706" />
           <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* --- LV.0: GOD POSTURE (Standing Hero, Front View) --- */}
      {level === 0 && (
        <g className="animate-bounce-slow" filter="url(#shadow)">
           {/* Aura */}
           <circle cx="100" cy="100" r="90" fill="url(#shell-gold)" opacity="0.2" />
           
           {/* Cape */}
           <path d="M60,180 L70,80 L130,80 L140,180 L100,170 Z" fill="#ef4444" />
           
           {/* Legs */}
           <path d="M85,130 L85,180" stroke="url(#skin-gradient)" strokeWidth="16" strokeLinecap="round" />
           <path d="M115,130 L115,180" stroke="url(#skin-gradient)" strokeWidth="16" strokeLinecap="round" />
           
           {/* Body */}
           <rect x="75" y="70" width="50" height="70" rx="15" fill="url(#skin-gradient)" />
           {/* Abs */}
           <path d="M85,85 H115 M85,105 H115 M85,125 H115 M100,85 V130" stroke="#4d7c0f" strokeWidth="2" opacity="0.4" />
           
           {/* Head */}
           <circle cx="100" cy="60" r="28" fill="url(#skin-gradient)" />
           
           {/* Crown */}
           <path d="M82,45 L82,25 L91,38 L100,20 L109,38 L118,25 L118,45 Z" fill="#facc15" stroke="#eab308" strokeWidth="1" />
           
           {/* Face (Confident) */}
           <path d="M90,62 Q100,68 110,62" fill="none" stroke="#1a2e05" strokeWidth="2" strokeLinecap="round" /> {/* Smirk */}
           <path d="M88,55 L95,58" stroke="#1a2e05" strokeWidth="3" strokeLinecap="round" /> {/* Sunglasses/Cool Eyes */}
           <path d="M105,58 L112,55" stroke="#1a2e05" strokeWidth="3" strokeLinecap="round" />
           
           {/* Arms (Hands on hips) */}
           <path d="M75,80 Q55,100 75,110" fill="none" stroke="url(#skin-gradient)" strokeWidth="10" strokeLinecap="round" />
           <path d="M125,80 Q145,100 125,110" fill="none" stroke="url(#skin-gradient)" strokeWidth="10" strokeLinecap="round" />

           <text x="100" y="195" textAnchor="middle" fontSize="14" fill="#ca8a04" fontWeight="bold" fontFamily="sans-serif">GOD POSTURE</text>
        </g>
      )}

      {/* --- LV.1: BABY TURTLE (Standing Toddler, Front View) --- */}
      {level === 1 && (
        <g filter="url(#shadow)">
           {/* Shell (Visible from back/sides) */}
           <path d="M60,100 Q50,120 60,140" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" />
           <path d="M140,100 Q150,120 140,140" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" />

           {/* Legs (Short & Cute) */}
           <path d="M85,150 L85,180" stroke="url(#skin-gradient)" strokeWidth="14" strokeLinecap="round" />
           <path d="M115,150 L115,180" stroke="url(#skin-gradient)" strokeWidth="14" strokeLinecap="round" />

           {/* Body (Round) */}
           <ellipse cx="100" cy="130" rx="35" ry="32" fill="url(#skin-gradient)" />
           {/* Diaper/Shell Belly */}
           <path d="M80,140 Q100,165 120,140" fill="none" stroke="#fff" strokeWidth="20" opacity="0.8" />

           {/* Head (Big) */}
           <circle cx="100" cy="85" r="38" fill="url(#skin-gradient)" />
           
           {/* Face (Big Sparkly Eyes) */}
           <circle cx="88" cy="85" r="6" fill="#1a2e05" />
           <circle cx="90" cy="83" r="2" fill="white" />
           <circle cx="112" cy="85" r="6" fill="#1a2e05" />
           <circle cx="114" cy="83" r="2" fill="white" />
           <ellipse cx="85" cy="95" rx="5" ry="3" fill="#fca5a5" opacity="0.6" /> {/* Blush */}
           <ellipse cx="115" cy="95" rx="5" ry="3" fill="#fca5a5" opacity="0.6" />
           <path d="M96,98 Q100,102 104,98" fill="none" stroke="#1a2e05" strokeWidth="2" strokeLinecap="round" />

           {/* Arms (Happy Up) */}
           <path d="M70,110 Q55,90 65,80" fill="none" stroke="url(#skin-gradient)" strokeWidth="10" strokeLinecap="round" />
           <path d="M130,110 Q145,90 135,80" fill="none" stroke="url(#skin-gradient)" strokeWidth="10" strokeLinecap="round" />

           <text x="100" y="195" textAnchor="middle" fontSize="14" fill="#15803d" fontWeight="bold" fontFamily="sans-serif">BABY TURTLE</text>
        </g>
      )}

      {/* --- LV.2: STUDENT TURTLE (Sitting at Desk, Front View) --- */}
      {level === 2 && (
        <g filter="url(#shadow)">
           {/* Chair Back (Behind) */}
           <rect x="60" y="50" width="80" height="100" rx="10" fill="#78350f" />
           <rect x="70" y="60" width="60" height="80" rx="5" fill="#92400e" />

           {/* Body (Sitting, hunched) */}
           <path d="M70,120 Q100,110 130,120 L125,180 L75,180 Z" fill="url(#skin-gradient)" />
           
           {/* Head (Lowered, forward) */}
           <circle cx="100" cy="105" r="32" fill="url(#skin-gradient)" />
           
           {/* Headband "필승" */}
           <path d="M68,90 Q100,80 132,90" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" />
           <circle cx="100" cy="86" r="5" fill="#ef4444" /> {/* Red circle on headband */}
           <path d="M128,90 L135,100 L140,90" fill="white" /> {/* Headband knot */}

           {/* Glasses */}
           <circle cx="90" cy="108" r="9" fill="#e0f2fe" fillOpacity="0.6" stroke="#000" strokeWidth="2" />
           <circle cx="110" cy="108" r="9" fill="#e0f2fe" fillOpacity="0.6" stroke="#000" strokeWidth="2" />
           <line x1="99" y1="108" x2="101" y2="108" stroke="#000" strokeWidth="2" />

           {/* Eyes (Tired/Focused) */}
           <line x1="86" y1="108" x2="94" y2="108" stroke="#000" strokeWidth="2" />
           <line x1="106" y1="108" x2="114" y2="108" stroke="#000" strokeWidth="2" />
           <path d="M98,118 Q100,120 102,118" fill="none" stroke="#000" strokeWidth="1" />

           {/* Arms (Resting on desk) */}
           <path d="M60,150 Q70,170 90,170" fill="none" stroke="url(#skin-gradient)" strokeWidth="14" strokeLinecap="round" />
           <path d="M140,150 Q130,170 110,170" fill="none" stroke="url(#skin-gradient)" strokeWidth="14" strokeLinecap="round" />

           {/* Desk (Foreground) */}
           <rect x="20" y="170" width="160" height="30" fill="#d97706" stroke="#b45309" strokeWidth="2" rx="2" />
           
           {/* Books */}
           <rect x="25" y="155" width="40" height="15" fill="#ef4444" stroke="#991b1b" strokeWidth="1" rx="1" />
           <rect x="30" y="145" width="30" height="10" fill="#3b82f6" stroke="#1e40af" strokeWidth="1" rx="1" />
           
           {/* Pencil */}
           <path d="M110,160 L120,175" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />

           <text x="100" y="195" textAnchor="middle" fontSize="14" fill="#a16207" fontWeight="bold" fontFamily="sans-serif">만년 수험생</text>
        </g>
      )}

      {/* --- LV.3: TURTLE MASTER (Standing Sage, Front View) --- */}
      {level === 3 && (
        <g filter="url(#shadow)">
           {/* Robe/Shell (Long coat style) */}
           <path d="M65,180 L75,90 L125,90 L135,180 Z" fill="#78350f" />
           <line x1="100" y1="90" x2="100" y2="180" stroke="#5c2b0b" strokeWidth="2" />

           {/* Head */}
           <circle cx="100" cy="75" r="24" fill="url(#skin-gradient)" />
           
           {/* Eyebrows (Long White) */}
           <path d="M85,70 Q90,65 95,70" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
           <path d="M105,70 Q110,65 115,70" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
           
           {/* Beard (Long White) */}
           <path d="M90,90 Q100,120 110,90" fill="white" />
           
           {/* Staff */}
           <line x1="145" y1="50" x2="145" y2="180" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
           <circle cx="145" cy="50" r="6" fill="#10b981" /> {/* Gem */}
           
           {/* Arm holding Staff */}
           <path d="M120,110 L145,110" stroke="url(#skin-gradient)" strokeWidth="10" strokeLinecap="round" />
           <circle cx="145" cy="110" r="8" fill="url(#skin-gradient)" />
           
           {/* Other Arm (Behind back or relaxed) */}
           <path d="M80,110 L65,130" stroke="url(#skin-gradient)" strokeWidth="10" strokeLinecap="round" />

           <text x="100" y="195" textAnchor="middle" fontSize="14" fill="#9a3412" fontWeight="bold" fontFamily="sans-serif">TURTLE MASTER</text>
        </g>
      )}

      {/* --- LV.4: NINJA MUTANT (Standing Fighter, Dynamic) --- */}
      {level === 4 && (
        <g filter="url(#shadow)">
           {/* Legs (Wide Stance) */}
           <path d="M80,140 L60,180" stroke="url(#skin-gradient)" strokeWidth="16" strokeLinecap="round" />
           <path d="M120,140 L140,180" stroke="url(#skin-gradient)" strokeWidth="16" strokeLinecap="round" />
           
           {/* Body */}
           <path d="M75,80 L125,80 L120,140 L80,140 Z" fill="url(#skin-gradient)" />
           <rect x="75" y="85" width="50" height="45" rx="10" fill="#fcd34d" opacity="0.6" /> {/* Shell Chest */}
           
           {/* Belt */}
           <rect x="75" y="130" width="50" height="12" fill="#52525b" />
           <circle cx="100" cy="136" r="8" fill="#d97706" />
           <text x="100" y="140" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">R</text>
           
           {/* Head */}
           <circle cx="100" cy="65" r="26" fill="url(#skin-gradient)" />
           
           {/* Mask (Red) */}
           <path d="M74,58 H126 V72 H74 Z" fill="#ef4444" />
           <path d="M126,60 L140,55 L140,75 Z" fill="#ef4444" /> {/* Mask Tails */}
           
           {/* Eyes (Angry) */}
           <path d="M86,68 L96,62" stroke="white" strokeWidth="3" strokeLinecap="round" />
           <path d="M114,68 L104,62" stroke="white" strokeWidth="3" strokeLinecap="round" />
           
           {/* Arms (Action Pose) */}
           <path d="M75,90 L50,80 L50,50" fill="none" stroke="url(#skin-gradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
           <path d="M125,90 L150,80" fill="none" stroke="url(#skin-gradient)" strokeWidth="12" strokeLinecap="round" />
           
           {/* Weapon (Sword) */}
           <path d="M50,60 L50,10" stroke="#94a3b8" strokeWidth="4" />
           <rect x="45" y="50" width="10" height="15" fill="#334155" />

           <text x="100" y="195" textAnchor="middle" fontSize="14" fill="#b91c1c" fontWeight="bold" fontFamily="sans-serif">NINJA MUTANT</text>
        </g>
      )}
    </svg>
  );
};

// --- Photo Guide Component ---
const PhotoGuide = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-turtle-100 shadow-sm mb-4">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
        <Camera className="w-4 h-4 mr-2 text-turtle-600" />
        이렇게 찍어야 정확해요!
      </h3>
      <div className="flex justify-center gap-4 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-50 rounded-full border-2 border-green-500 flex items-center justify-center relative overflow-hidden">
             {/* Side Profile Icon */}
             <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800">
               <path d="M45,30 Q65,30 65,50 Q65,60 55,60 L55,90" stroke="currentColor" strokeWidth="3" fill="none" />
               <circle cx="55" cy="40" r="15" fill="#f3f4f6" stroke="currentColor" strokeWidth="2" />
               <path d="M70,40 L75,40" stroke="currentColor" strokeWidth="2" /> {/* Nose hint */}
               <path d="M20,90 L80,90" stroke="currentColor" strokeWidth="3" />
             </svg>
             <div className="absolute top-2 right-2 text-green-600 bg-white rounded-full p-0.5 shadow-sm">
               <CheckCircle2 className="w-4 h-4" />
             </div>
          </div>
          <span className="text-xs font-bold text-green-700 mt-2">옆모습 촬영</span>
        </div>
        <div className="flex flex-col items-center opacity-70">
          <div className="w-20 h-20 bg-red-50 rounded-full border-2 border-red-300 flex items-center justify-center relative overflow-hidden">
             {/* Front Face Icon */}
             <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
               <circle cx="50" cy="40" r="15" fill="#e5e7eb" stroke="currentColor" strokeWidth="2"/>
               <path d="M40,80 Q20,60 10,30" fill="none" stroke="currentColor" strokeWidth="3" />
               <path d="M50,55 L50,80" stroke="currentColor" strokeWidth="3" />
               <circle cx="45" cy="38" r="1.5" fill="currentColor" />
               <circle cx="55" cy="38" r="1.5" fill="currentColor" />
             </svg>
             <div className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-0.5 shadow-sm">
               <XCircle className="w-4 h-4" />
             </div>
          </div>
          <span className="text-xs font-bold text-red-400 mt-2">앞모습/셀카 X</span>
        </div>
      </div>
      <ul className="text-sm text-gray-600 space-y-2 bg-gray-50 p-3 rounded-lg">
        <li className="flex items-start text-red-500 font-bold">
          <AlertCircle className="w-4 h-4 mr-2 mt-0.5" />
          <span>정확한 측정을 위해 반드시 옆모습을 찍어주세요!</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-0.5 text-turtle-500">1.</span>
          <span><strong>타이머(3~5초)</strong>를 켜고, 폰을 눈높이에 두세요.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-0.5 text-turtle-500">2.</span>
          <span>가능하면 <strong>옆에 있는 친구</strong>한테 찍어달라고 하세요!</span>
        </li>
      </ul>
    </div>
  );
};

interface AnalysisResult {
  angle: number;
  weight: number;
  message: string;
  level: number;
  levelTitle: string;
  color: string;
}

// Normalized points (0-1)
interface Points {
  ear: { x: number; y: number };
  shoulder: { x: number; y: number };
}

export default function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Verification State (Human in the loop)
  const [points, setPoints] = useState<Points | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<'ear' | 'shoulder' | null>(null);
  
  // Share & Toast State
  const [showShareModal, setShowShareModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const poseModelRef = useRef<any>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  useEffect(() => {
    if (window.Pose) {
      const pose = new window.Pose({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });
      pose.setOptions({
        modelComplexity: 1, 
        smoothLandmarks: false,
        enableSegmentation: false,
        minDetectionConfidence: 0.3, 
        minTrackingConfidence: 0.3, 
      });
      pose.onResults(onPoseResults);
      poseModelRef.current = pose;
    } else {
      setError("AI 로딩 실패. 새로고침 해주세요!");
    }
  }, []);

  // Redraw canvas whenever points change (Drag Loop)
  useEffect(() => {
    if (canvasRef.current && imageSrc && points) {
       const canvas = canvasRef.current;
       const ctx = canvas.getContext('2d');
       const img = new Image();
       img.src = imageSrc;
       img.onload = () => {
         if (ctx) {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
           
           const ex = points.ear.x * canvas.width;
           const ey = points.ear.y * canvas.height;
           const sx = points.shoulder.x * canvas.width;
           const sy = points.shoulder.y * canvas.height;

           ctx.beginPath();
           ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
           ctx.lineWidth = 2;
           ctx.moveTo(sx, sy);
           ctx.lineTo(ex, ey);
           ctx.stroke();

           drawControlPoint(ctx, ex, ey, '#ef4444', '👂');
           drawControlPoint(ctx, sx, sy, '#22c55e', '💪');
         }
       };
    }
  }, [points, imageSrc]);

  const drawControlPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, label: string) => {
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1.0;

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.font = '20px Arial';
    ctx.fillText(label, x + 12, y + 6);
  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setResult(null);
    setPoints(null);
    setError(null);
    
    const img = new Image();
    img.src = url;
    img.onload = () => processImage(img);
  };

  const processImage = async (image: HTMLImageElement) => {
    setIsAnalyzing(true);
    setProgress(10); 
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) return prev; // Stop random increment if at 99 or more
        const next = prev + Math.floor(Math.random() * 20); 
        return Math.min(next, 99); // Ensure it never exceeds 99
      });
    }, 100);

    if (poseModelRef.current) {
      await poseModelRef.current.reset();
      
      let inputFrame: HTMLImageElement | HTMLCanvasElement = image;
      const MAX_SIZE = 1280;
      if (image.width > MAX_SIZE || image.height > MAX_SIZE) {
         const scale = MAX_SIZE / Math.max(image.width, image.height);
         const canvas = document.createElement('canvas');
         canvas.width = Math.floor(image.width * scale);
         canvas.height = Math.floor(image.height * scale);
         const ctx = canvas.getContext('2d');
         if (ctx) {
             ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
             inputFrame = canvas;
         }
      }

      await poseModelRef.current.send({ image: inputFrame });
    }
    
    clearInterval(interval);
    setProgress(100);
  };

  const onPoseResults = (results: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = results.image.width;
    canvas.height = results.image.height;
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    let detectedPoints: Points = {
      ear: { x: 0.5, y: 0.3 },
      shoulder: { x: 0.5, y: 0.6 }
    };

    let aiFailed = false;

    if (!results.poseLandmarks) {
      aiFailed = true;
    } else {
      const landmarks = results.poseLandmarks;
      const leftScore = (landmarks[7].visibility || 0) + (landmarks[11].visibility || 0);
      const rightScore = (landmarks[8].visibility || 0) + (landmarks[12].visibility || 0);
      
      const isLeftProfile = leftScore > rightScore;
      const ear = isLeftProfile ? landmarks[7] : landmarks[8];
      const shoulder = isLeftProfile ? landmarks[11] : landmarks[12];
      
      const isValid = (p: any) => p.visibility > 0.3 && p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1;

      if (isValid(ear) && isValid(shoulder)) {
        detectedPoints = {
          ear: { x: ear.x, y: ear.y },
          shoulder: { x: shoulder.x, y: shoulder.y }
        };
      } else {
        aiFailed = true;
      }
    }

    if (aiFailed) {
      showToast("AI가 위치를 잘 못찾았어요. 직접 수정해주세요!");
    }

    setPoints(detectedPoints);
    setIsAnalyzing(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!points || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    const earX = points.ear.x * canvas.width;
    const earY = points.ear.y * canvas.height;
    const shoulderX = points.shoulder.x * canvas.width;
    const shoulderY = points.shoulder.y * canvas.height;
    const HIT_RADIUS = 40 * Math.max(scaleX, 1);
    const distToEar = Math.hypot(clickX - earX, clickY - earY);
    const distToShoulder = Math.hypot(clickX - shoulderX, clickY - shoulderY);

    if (distToEar < HIT_RADIUS) {
      setDraggingPoint('ear');
      canvas.setPointerCapture(e.pointerId);
    } else if (distToShoulder < HIT_RADIUS) {
      setDraggingPoint('shoulder');
      canvas.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingPoint || !points || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const moveX = (e.clientX - rect.left) * scaleX;
    const moveY = (e.clientY - rect.top) * scaleY;
    const normX = Math.min(Math.max(moveX / canvas.width, 0), 1);
    const normY = Math.min(Math.max(moveY / canvas.height, 0), 1);
    setPoints(prev => prev ? { ...prev, [draggingPoint]: { x: normX, y: normY } } : null);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setDraggingPoint(null);
    if (canvasRef.current) canvasRef.current.releasePointerCapture(e.pointerId);
  };

  const handleConfirmPoints = () => {
    if (!points || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const earX = points.ear.x * canvas.width;
    const earY = points.ear.y * canvas.height;
    const shoulderX = points.shoulder.x * canvas.width;
    const shoulderY = points.shoulder.y * canvas.height;
    const img = new Image();
    img.src = imageSrc!;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        analyzeAndShowResult(earX, earY, shoulderX, shoulderY, ctx);
    };
  };

  const analyzeAndShowResult = (earX: number, earY: number, shoulderX: number, shoulderY: number, ctx: CanvasRenderingContext2D) => {
    const deltaX = Math.abs(earX - shoulderX);
    const deltaY = shoulderY - earY; 
    const effectiveDeltaY = Math.max(1, deltaY);
    const angleRad = Math.atan2(deltaX, effectiveDeltaY);
    const angleDeg = Math.round(angleRad * (180 / Math.PI));

    let load = 5;
    // Kapandji's Biomechanics of the Spine Model
    if (angleDeg <= 0) load = 5;
    else if (angleDeg <= 15) load = 5 + ((12 - 5) * (angleDeg / 15));
    else if (angleDeg <= 30) load = 12 + ((18 - 12) * ((angleDeg - 15) / 15));
    else if (angleDeg <= 45) load = 18 + ((22 - 18) * ((angleDeg - 30) / 15));
    else if (angleDeg <= 60) load = 22 + ((27 - 22) * ((angleDeg - 45) / 15));
    else load = 27 + ((angleDeg - 60) * 0.5); 
    const finalLoad = Math.round(load * 10) / 10;

    let level = 0, levelTitle = "", message = "", color = "";
    if (angleDeg <= 5) {
      level = 0; levelTitle = "LV.0 탈거북 휴먼"; message = "와우! 거북목 유전자가 0%입니다. 완벽한 자세네요!"; color = "#3b82f6";
    } else if (angleDeg <= 15) {
      level = 1; levelTitle = "LV.1 아기 거북이"; message = "아직은 귀여운 수준이지만, 스마트폰을 너무 많이 보면 위험해요!"; color = "#22c55e";
    } else if (angleDeg <= 30) {
      level = 2; levelTitle = "LV.2 만년 수험생"; message = `목에 볼링공(${finalLoad}kg)을 달고 열공 중? 스트레칭이 시급해요!`; color = "#eab308";
    } else if (angleDeg <= 45) {
      level = 3; levelTitle = "LV.3 거북 도사"; message = "거의 등껍질이 생기기 직전! 이대로 가다간 만수무강 거북이가 됩니다."; color = "#f97316";
    } else {
      level = 4; levelTitle = "LV.MAX 닌자 거북이"; message = `목에 쌀 한 가마니(${finalLoad}kg)가?! 전투력이 상승했지만 건강은 하락 중...`; color = "#ef4444";
    }

    setResult({ angle: angleDeg, weight: finalLoad, message, level, levelTitle, color });
    drawFinalVisualization(ctx, earX, earY, shoulderX, shoulderY, angleDeg, color);
  };

  const drawFinalVisualization = (ctx: CanvasRenderingContext2D, ex: number, ey: number, sx: number, sy: number, ang: number, color: string) => {
    ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.setLineDash([10, 10]); ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.moveTo(sx, sy); ctx.lineTo(sx, ey - 50); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.strokeStyle = color; ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, 8, 0, 2 * Math.PI); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = color; ctx.stroke();
    ctx.beginPath(); ctx.arc(ex, ey, 8, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, 40, -Math.PI/2, -Math.PI/2 + (Math.atan2(ex - sx, sy - ey)), ex < sx); ctx.stroke();
    ctx.font = 'bold 30px "Jalnan", sans-serif'; ctx.fillStyle = '#ffffff'; ctx.strokeStyle = 'black'; ctx.lineWidth = 4;
    const mx = (ex + sx) / 2, my = (ey + sy) / 2;
    ctx.strokeText(`${ang}°`, mx + 20, my); ctx.fillText(`${ang}°`, mx + 20, my);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: '거북목 레벨테스트 🐢',
      text: `내 거북목 레벨은? [${result?.levelTitle}] 입니다! 🐢\n측정결과: ${result?.message}\n\n#거북목테스트 #거북목측정 #AI진단`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); return; } catch (err) { console.log('Share canceled'); }
    }
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => showToast("링크가 복사되었습니다!"));
  };

  const resetAll = () => {
    setImageSrc(null); setResult(null); setPoints(null);
  };

  return (
    <div className="min-h-screen bg-turtle-50 font-sans pb-20 relative">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-turtle-100">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐢</span>
            <h1 className="text-lg font-bold text-turtle-900 tracking-tight">거북목 레벨테스트</h1>
          </div>
          <div className="bg-turtle-100 text-turtle-800 text-xs font-bold px-2 py-1 rounded-lg">BETA</div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {!imageSrc && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2 mt-8">
              <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">혹시 나도...<br/><span className="text-turtle-600">거북이</span> 일까?</h2>
              <p className="text-gray-500">3초만에 AI로 확인하는 내 목 상태</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-turtle-100/50 border border-turtle-100 flex flex-col items-center">
              <div className="relative w-40 h-40 mb-6">
                <div className="absolute inset-0 bg-turtle-100 rounded-full animate-pulse opacity-50"></div>
                <TurtleCharacter level={1} className="w-full h-full relative z-10 animate-bounce-slow" />
              </div>

              <div className="w-full mb-2"><PhotoGuide /></div>
              
              <div className="space-y-3 w-full">
                {/* 카메라 버튼 (안드로이드에서 바로 카메라 실행 제안) */}
                <button 
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full bg-turtle-600 hover:bg-turtle-700 text-white text-lg font-bold py-4 rounded-2xl shadow-lg shadow-turtle-500/30 transition-all active:scale-95 flex items-center justify-center space-x-2 group"
                >
                  <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>카메라로 촬영하기</span>
                </button>
                
                {/* 갤러리 버튼 */}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white border-2 border-turtle-100 text-turtle-700 text-lg font-bold py-4 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center space-x-2 group"
                >
                  <ImageIcon className="w-6 h-6 text-turtle-500" />
                  <span>갤러리에서 불러오기</span>
                </button>

                <p className="text-xs text-center text-gray-400 mt-2">* 사진은 서버에 저장되지 않고 즉시 삭제됩니다</p>
              </div>

              {/* 카메라 직접 트리거를 위한 전용 input */}
              <input 
                type="file" 
                ref={cameraInputRef} 
                className="hidden" 
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
              />
              {/* 일반 파일 선택 input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}

        {imageSrc && (
          <div className="space-y-6 animate-fade-in">
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] group touch-none">
              <canvas 
                ref={canvasRef}
                onPointerDown={!result && !isAnalyzing ? handlePointerDown : undefined}
                onPointerMove={!result && !isAnalyzing ? handlePointerMove : undefined}
                onPointerUp={!result && !isAnalyzing ? handlePointerUp : undefined}
                onPointerLeave={!result && !isAnalyzing ? handlePointerUp : undefined}
                className={`w-full h-full object-contain ${!result && !isAnalyzing ? 'cursor-move' : ''}`} 
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white backdrop-blur-sm pointer-events-none z-20">
                  <div className="w-16 h-16 border-4 border-turtle-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-lg font-bold animate-pulse">거북이 판독 중...🐢</p>
                  <p className="text-3xl font-black mt-4 text-turtle-300 tracking-wider">{progress}%</p>
                </div>
              )}
              {!result && !isAnalyzing && points && (
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 text-center pointer-events-none">
                   <div className="bg-black/60 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm animate-bounce">☝️ 점을 드래그해서 위치를 맞춰주세요!</div>
                 </div>
              )}
            </div>

            {!result && !isAnalyzing && points && (
              <div className="bg-white p-5 rounded-3xl shadow-lg border border-turtle-100 animate-fade-in-up">
                 <h3 className="text-center font-bold text-lg mb-4 text-gray-800">위치가 정확한가요? 🤔</h3>
                 <p className="text-xs text-center text-gray-500 mb-6"><span className="text-red-500 font-bold">빨간점(👂)</span>은 귓구멍, <span className="text-green-500 font-bold">초록점(💪)</span>은 어깨 중앙에 맞춰주세요.</p>
                 <div className="flex gap-3">
                   <button onClick={resetAll} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-colors">다시 찍기</button>
                   <button onClick={handleConfirmPoints} className="flex-[2] py-3.5 rounded-xl bg-turtle-600 hover:bg-turtle-700 text-white font-bold shadow-lg transition-colors flex items-center justify-center gap-2">
                     <CheckCircle2 className="w-5 h-5" />결과 확인하기
                   </button>
                 </div>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-b-4 relative overflow-hidden animate-fade-in" style={{ borderColor: result.color }}>
                <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-bl-xl">AI 분석결과</div>
                <div className="text-center mt-2 mb-6">
                  <p className="text-gray-500 font-medium mb-1">당신의 거북목 레벨은?</p>
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: result.color }}>{result.levelTitle}</h2>
                </div>
                <div className="flex justify-center mb-6"><div className="w-40 h-40 relative"><TurtleCharacter level={result.level} className="w-full h-full relative z-10" /></div></div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="bg-gray-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-400 mb-1">목 꺾임 각도</div><div className="text-xl font-bold text-gray-800">{result.angle}°</div></div>
                   <div className="bg-gray-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-400 mb-1">목 부담 하중</div><div className="text-xl font-bold text-gray-800">{result.weight}kg</div></div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center mb-6"><p className="text-gray-700 font-medium leading-relaxed break-keep">"{result.message}"</p></div>
                <div className="flex justify-center mb-4">
                  <p className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded">수치 근거: Dr. Kapandji (Physiology of the Joints)</p>
                </div>
                <div className="space-y-3">
                  <button onClick={handleShare} className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-2"><Share2 className="w-5 h-5" /><span>친구에게 내 레벨 자랑하기</span></button>
                  <button onClick={resetAll} className="w-full bg-white border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2"><RefreshCcw className="w-5 h-5" /><span>다시하기</span></button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl relative border border-gray-100">
              <button onClick={() => setShowShareModal(false)} className="absolute top-3 right-3 text-gray-400 p-2"><X className="w-6 h-6" /></button>
              <h3 className="text-lg font-bold text-center mb-6 text-gray-800">결과 공유하기</h3>
              <div className="grid grid-cols-4 gap-2 mb-6">
                  <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 bg-[#FEE500] rounded-full flex items-center justify-center shadow-sm"><MessageCircle className="w-6 h-6 text-[#3C1E1E] fill-current" /></div><span className="text-xs text-gray-600 font-medium">카톡</span></button>
                  <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm text-white"><Instagram className="w-6 h-6" /></div><span className="text-xs text-gray-600 font-medium">인스타</span></button>
                  <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-sm text-white"><Twitter className="w-5 h-5 fill-current" /></div><span className="text-xs text-gray-600 font-medium">X</span></button>
                  <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-sm text-gray-700"><Link className="w-5 h-5" /></div><span className="text-xs text-gray-600 font-medium">링크복사</span></button>
              </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-5 py-3 rounded-full text-sm font-bold animate-fade-in-up z-[110] shadow-lg flex items-center backdrop-blur-sm whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />{toastMessage}
        </div>
      )}

      <footer className="text-center py-8 px-6">
         <div className="text-[10px] text-gray-400 bg-gray-50 p-3 rounded-lg inline-block mx-auto">
           ⚠️ 본 결과는 재미를 위한 AI 분석이며, 의학적 진단이 아닙니다.<br/>통증이 있다면 반드시 정형외과를 방문하세요.
         </div>
         <p className="mt-4 text-gray-300 text-xs font-bold">@acedoctor2026</p>
      </footer>
    </div>
  );
}
