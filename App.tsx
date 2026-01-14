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
  const skinColor = "#a3e635"; 
  const shellColor = "#4d7c0f"; 
  const shellStroke = "#365314"; 
  const blushColor = "#fca5a5"; 

  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {level === 0 && (
        <g className="animate-bounce-slow">
           <ellipse cx="100" cy="50" rx="30" ry="8" fill="none" stroke="#fbbf24" strokeWidth="4" />
           <path d="M60,100 Q40,80 20,90 Q10,110 50,130" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="2" />
           <path d="M140,100 Q160,80 180,90 Q190,110 150,130" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="2" />
           <rect x="75" y="80" width="50" height="80" rx="25" fill={skinColor} />
           <path d="M85,90 L115,90 L115,140 L85,140 Z" fill="#ecfccb" opacity="0.6" rx="10" />
           <circle cx="100" cy="70" r="35" fill={skinColor} />
           <circle cx="90" cy="65" r="4" fill="#1a2e05" />
           <circle cx="110" cy="65" r="4" fill="#1a2e05" />
           <path d="M95,75 Q100,80 105,75" fill="none" stroke="#1a2e05" strokeWidth="3" strokeLinecap="round" />
           <ellipse cx="85" cy="72" rx="4" ry="2" fill={blushColor} opacity="0.6" />
           <ellipse cx="115" cy="72" rx="4" ry="2" fill={blushColor} opacity="0.6" />
           <text x="100" y="190" textAnchor="middle" fontSize="16" fill="#1a2e05" fontWeight="bold" fontFamily="sans-serif">GOD POSTURE</text>
        </g>
      )}

      {level === 1 && (
        <g>
           <path d="M130,150 Q130,170 110,170 L110,140" fill={skinColor} />
           <path d="M170,140 Q190,160 180,130" fill={skinColor} /> 
           <path d="M60,140 Q110,50 170,130 L160,150 L70,150 Z" fill={shellColor} />
           <path d="M90,90 L130,90 M110,90 L110,65 M110,90 L90,115 M110,90 L130,115" stroke={shellStroke} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
           <path d="M65,140 Q110,60 165,130" fill="none" stroke={shellStroke} strokeWidth="2" opacity="0.3" />
           <path d="M80,140 Q80,175 50,170 L60,130" fill={skinColor} />
           <circle cx="55" cy="110" r="45" fill={skinColor} />
           <circle cx="40" cy="105" r="5" fill="#1a2e05" /> 
           <circle cx="70" cy="105" r="5" fill="#1a2e05" /> 
           <path d="M48,120 Q55,130 62,120" fill="none" stroke="#1a2e05" strokeWidth="3" strokeLinecap="round" /> 
           <ellipse cx="35" cy="115" rx="5" ry="3" fill={blushColor} opacity="0.5" />
           <ellipse cx="75" cy="115" rx="5" ry="3" fill={blushColor} opacity="0.5" />
           <text x="100" y="190" textAnchor="middle" fontSize="16" fill="#4d7c0f" fontWeight="bold" fontFamily="sans-serif">BABY TURTLE</text>
        </g>
      )}

      {level === 2 && (
        <g>
           <ellipse cx="140" cy="160" rx="15" ry="10" fill={skinColor} />
           <ellipse cx="60" cy="160" rx="15" ry="10" fill={skinColor} />
           <path d="M50,150 Q100,60 160,140" fill={shellColor} />
           <path d="M80,100 L120,95 M100,70 L100,100" stroke={shellStroke} strokeWidth="3" opacity="0.5" />
           <g transform="translate(40, 120) rotate(20)">
             <circle cx="0" cy="0" r="40" fill={skinColor} />
             <circle cx="-15" cy="5" r="5" fill="#1a2e05" />
             <circle cx="15" cy="5" r="5" fill="#1a2e05" />
             <path d="M-5,20 L5,20" stroke="#1a2e05" strokeWidth="2" />
           </g>
           <rect x="50" y="150" width="15" height="25" rx="2" fill="#333" transform="rotate(10)" />
           <path d="M55,152 L55,160" stroke="white" strokeWidth="1" transform="rotate(10)" />
           <text x="100" y="190" textAnchor="middle" fontSize="16" fill="#ca8a04" fontWeight="bold" fontFamily="sans-serif">SMARTPHONE ZOMBIE</text>
        </g>
      )}

      {level === 3 && (
        <g>
           <ellipse cx="150" cy="160" rx="15" ry="10" fill={skinColor} />
           <ellipse cx="70" cy="160" rx="15" ry="10" fill={skinColor} />
           <path d="M50,150 Q100,40 170,150" fill="#3f6212" /> 
           <path d="M80,100 L140,100 M110,70 L110,130" stroke="#1a2e05" strokeWidth="2" opacity="0.3" />
           <circle cx="60" cy="120" r="40" fill={skinColor} />
           <path d="M40,110 Q50,105 60,110" fill="none" stroke="white" strokeWidth="4" /> 
           <path d="M65,110 Q75,105 85,110" fill="none" stroke="white" strokeWidth="4" /> 
           <path d="M50,140 Q60,150 70,140" fill="none" stroke="white" strokeWidth="4" /> 
           <path d="M45,120 L55,120" stroke="#1a2e05" strokeWidth="2" />
           <path d="M70,120 L80,120" stroke="#1a2e05" strokeWidth="2" />
           <path d="M30,170 L40,120 Q45,110 35,110" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
           <text x="100" y="190" textAnchor="middle" fontSize="16" fill="#ea580c" fontWeight="bold" fontFamily="sans-serif">MASTER TURTLE</text>
        </g>
      )}

      {level === 4 && (
        <g>
           <path d="M130,160 L150,170 L140,140" fill={skinColor} />
           <path d="M70,160 L50,170 L60,140" fill={skinColor} />
           <path d="M50,140 Q100,60 170,150" fill="#15803d" stroke="#000" strokeWidth="3" />
           <circle cx="60" cy="110" r="40" fill={skinColor} stroke="#000" strokeWidth="2" />
           <path d="M25,100 L95,100 L95,120 L25,120 Z" fill="#ef4444" />
           <path d="M15,105 Q10,90 25,100 M15,115 Q10,130 25,120" fill="none" stroke="#ef4444" strokeWidth="4" />
           <path d="M40,105 L55,115 L40,115 Z" fill="white" />
           <path d="M80,105 L65,115 L80,115 Z" fill="white" />
           <path d="M100,90 Q105,80 100,70" fill="none" stroke="#0ea5e9" strokeWidth="2" />
           <text x="100" y="190" textAnchor="middle" fontSize="16" fill="#dc2626" fontWeight="bold" fontFamily="sans-serif">NINJA MUTANT</text>
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
             <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800">
               <rect x="35" y="40" width="30" height="40" rx="4" fill="white" stroke="currentColor" strokeWidth="2" />
               <circle cx="50" cy="55" r="5" fill="#22c55e" />
               <path d="M30,90 L70,90" stroke="currentColor" strokeWidth="3" />
               <path d="M80,30 L90,40 M85,25 L95,35" stroke="#ef4444" strokeWidth="2" />
             </svg>
             <div className="absolute top-2 right-2 text-green-600 bg-white rounded-full p-0.5 shadow-sm">
               <CheckCircle2 className="w-4 h-4" />
             </div>
          </div>
          <span className="text-xs font-bold text-green-700 mt-2">타이머 사용</span>
        </div>
        <div className="flex flex-col items-center opacity-70">
          <div className="w-20 h-20 bg-red-50 rounded-full border-2 border-red-300 flex items-center justify-center relative overflow-hidden">
             <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
               <circle cx="50" cy="40" r="15" fill="#e5e7eb" stroke="currentColor" strokeWidth="2"/>
               <path d="M40,80 Q20,60 10,30" fill="none" stroke="currentColor" strokeWidth="3" />
               <path d="M50,55 L50,80" stroke="currentColor" strokeWidth="3" />
             </svg>
             <div className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-0.5 shadow-sm">
               <XCircle className="w-4 h-4" />
             </div>
          </div>
          <span className="text-xs font-bold text-red-400 mt-2">셀카 금지</span>
        </div>
      </div>
      <ul className="text-sm text-gray-600 space-y-2 bg-gray-50 p-3 rounded-lg">
        <li className="flex items-start text-red-500 font-bold">
          <AlertCircle className="w-4 h-4 mr-2 mt-0.5" />
          <span>셀카는 팔 때문에 어깨가 올라가서 결과가 부정확해요!</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-0.5 text-turtle-500">1.</span>
          <span><strong>타이머(3~5초)</strong>를 켜고, 폰을 눈높이에 두세요.</span>
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
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 20); 
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
      level = 2; levelTitle = "LV.2 스마트폰 좀비"; message = `목에 볼링공(${finalLoad}kg)을 달고 사는 중! 스마트폰 그만!`; color = "#eab308";
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
