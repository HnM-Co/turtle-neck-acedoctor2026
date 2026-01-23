
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Camera, Share2, AlertCircle, RefreshCcw, MousePointer2,
  Image as ImageIcon, Download, Check, ChevronRight, Quote, X
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

// --- Toast Component ---
const Toast = ({ message, visible }: { message: string; visible: boolean }) => (
  <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
    <div className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/10 ring-1 ring-black/5">
      <div className="bg-emerald-500 rounded-full p-0.5"><Check className="w-3 h-3 text-white stroke-[4]" /></div>
      <span className="text-sm font-bold whitespace-nowrap tracking-tight">{message}</span>
    </div>
  </div>
);

// --- High Quality Turtle Character (SVG) ---
const TurtleCharacter: React.FC<{ level: number; size?: number; className?: string; id?: string }> = ({ level, size = 180, className = "", id }) => {
  const getStyle = () => {
    switch(level) {
      case 0: return { // King
        skin: "#86efac", shell: "#fbbf24", belly: "#fef08a", mask: "none", eye: "black", 
        prop: (<g><path d="M35 15 L50 35 L65 15 L65 35 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" /><circle cx="30" cy="10" r="3" fill="red"/><circle cx="50" cy="5" r="3" fill="blue"/><circle cx="70" cy="10" r="3" fill="red"/></g>) 
      }; 
      case 1: return { // Baby
        skin: "#bbf7d0", shell: "#86efac", belly: "#f0fdf4", mask: "none", eye: "black", 
        prop: <path d="M45 15 Q50 5 55 15 Q50 25 45 15 M50 25 L50 35" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
      }; 
      case 2: return { // Student
        skin: "#a3e635", shell: "#facc15", belly: "#fef08a", mask: "glasses", eye: "black", 
        prop: <g><rect x="30" y="85" width="40" height="25" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="2" rx="2"/><path d="M35 90 L65 90 M35 98 L65 98 M35 106 L55 106" stroke="white" strokeWidth="2"/></g>
      };
      case 3: return { // Master
        skin: "#fcd34d", shell: "#d97706", belly: "#fef3c7", mask: "beard", eye: "closed", 
        prop: <path d="M85 60 Q95 60 95 120" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
      }; 
      case 4: return { // Ninja
        skin: "#ef4444", shell: "#991b1b", belly: "#fee2e2", mask: "ninja", eye: "white", 
        // Dual Swords on Back
        backProp: (
          <g>
            {/* Blade 1 (Left to Right) */}
            <path d="M20 10 L80 90" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
            <path d="M20 10 L35 30" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" /> {/* Handle */}
            <path d="M30 32 L40 24" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" /> {/* Guard */}
            
            {/* Blade 2 (Right to Left) */}
            <path d="M80 10 L20 90" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
            <path d="M80 10 L65 30" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" /> {/* Handle */}
            <path d="M70 32 L60 24" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" /> {/* Guard */}
          </g>
        ),
        prop: null
      };
      default: return { skin: "#4ade80", shell: "#16a34a", belly: "#dcfce7", mask: "none", eye: "black", prop: null };
    }
  };

  const s = getStyle() as any;

  return (
    <svg id={id} viewBox="0 0 100 100" className={`drop-shadow-lg overflow-visible ${className}`} style={{ width: size, height: size }} xmlns="http://www.w3.org/2000/svg">
      {level === 4 && <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-slow" />}
      {level === 0 && <circle cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="10 5" className="animate-pulse" />}
      
      {/* Back Props (Swords) */}
      {s.backProp}
      
      <path d="M25 70 Q15 85 25 90" fill={s.skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
      <path d="M75 70 Q85 85 75 90" fill={s.skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
      <path d="M25 50 Q10 55 15 70" fill={s.skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
      <path d="M75 50 Q90 55 85 70" fill={s.skin} stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
      <ellipse cx="50" cy="65" rx="30" ry="28" fill={s.shell} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d="M35 55 Q50 85 65 55 Q50 45 35 55" fill={s.belly} opacity="0.9" />
      <circle cx="50" cy="35" r="18" fill={s.skin} />
      {s.mask === 'ninja' && <path d="M32 28 Q50 22 68 28 L68 40 Q50 45 32 40 Z" fill="#b91c1c" />}
      {s.mask === 'glasses' && <g><circle cx="43" cy="35" r="6" fill="white" stroke="black" strokeWidth="1.5" /><circle cx="57" cy="35" r="6" fill="white" stroke="black" strokeWidth="1.5" /><path d="M49 35 L51 35" stroke="black" strokeWidth="1.5" /><path d="M37 35 L32 32 M63 35 L68 32" stroke="black" strokeWidth="1.5" /></g>}
      {s.eye === 'closed' ? <g stroke="#78350f" strokeWidth="2" fill="none"><path d="M40 36 Q44 38 48 36" /><path d="M52 36 Q56 38 60 36" /></g> : s.mask !== 'glasses' ? <g fill={s.eye}><circle cx="42" cy="34" r={level === 1 ? 3 : 2} /><circle cx="58" cy="34" r={level === 1 ? 3 : 2} />{level === 1 && <g fill="white"><circle cx="43" cy="33" r="1"/><circle cx="59" cy="33" r="1"/></g>}</g> : <g fill="black"><circle cx="43" cy="35" r="2"/><circle cx="57" cy="35" r="2"/></g>}
      {s.mask === 'beard' ? <path d="M40 45 Q50 55 60 45 L50 52 Z" fill="white" stroke="#e2e8f0" strokeWidth="0.5" /> : <path d="M47 42 Q50 45 53 42" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />}
      {(level === 1 || level === 0) && <g fill="#f472b6" opacity="0.6"><circle cx="38" cy="40" r="2.5" /><circle cx="62" cy="40" r="2.5" /></g>}
      {s.prop}
      {level === 0 && <text x="50" y="10" fontSize="10" textAnchor="middle">👑</text>}
    </svg>
  );
};

// --- Infographic ---
const NeckLoadChart = ({ activeAngle }: { activeAngle: number }) => {
  const data = [
    { angle: 0, weight: '5', label: '0°' },
    { angle: 15, weight: '12', label: '15°' },
    { angle: 30, weight: '18', label: '30°' },
    { angle: 45, weight: '22', label: '45°' },
    { angle: 60, weight: '27', label: '60°' }
  ];
  return (
    <div className="w-full bg-slate-50/80 rounded-2xl p-4 border border-slate-100 mt-4">
      <div className="flex justify-between items-end h-20 gap-1.5">
        {data.map((item) => {
           const isActive = activeAngle > item.angle - 7.5 && activeAngle <= item.angle + 7.5;
           const isPassed = activeAngle >= item.angle;
           return (
            <div key={item.angle} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="absolute -top-7 transition-all duration-300 origin-bottom" style={{ transform: `rotate(${item.angle}deg)` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isActive ? 'text-emerald-500' : 'text-slate-300'}>
                   <circle cx="12" cy="8" r="4" /><path d="M12 12L12 20" />
                </svg>
              </div>
              <span className={`text-[9px] font-bold transition-all ${isActive ? 'text-emerald-600' : 'text-slate-300'}`}>{item.weight}kg</span>
              <div className="w-full bg-white rounded-t-md relative overflow-hidden transition-all duration-500 shadow-inner" style={{ height: `${25 + (item.angle/60)*75}%` }}>
                <div className={`absolute inset-0 w-full h-full transition-all duration-500 ${isActive ? 'bg-emerald-400' : isPassed ? 'bg-emerald-100' : 'bg-slate-200'}`} />
              </div>
              <span className="text-[9px] text-slate-400 font-medium">{item.label}</span>
            </div>
           );
        })}
      </div>
    </div>
  );
};

// --- Compact Guide ---
const PhotoGuide = () => (
  <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100/50 mb-4">
    <h3 className="font-bold text-emerald-900 text-xs flex items-center mb-2.5">
      <Camera className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> 정확한 결과 위한 촬영 꿀팁
    </h3>
    <div className="grid grid-cols-1 gap-2">
      {[
        "평소 편한 자세로 촬영 준비",
        "어깨와 귀가 보이게 머리 정리",
        "타이머 촬영 혹은 지인 도움으로 최대한 옆모습으로 촬영"
      ].map((text, i) => (
        <div key={i} className="flex items-center text-[11px] text-emerald-800/80 bg-white/40 rounded-lg px-2.5 py-1.5">
          <span className="bg-emerald-200 text-emerald-700 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold mr-2 shrink-0">{i+1}</span>
          {text}
        </div>
      ))}
    </div>
  </div>
);

interface AnalysisResult {
  angle: number; weight: string; level: number; levelTitle: string; description: string; color: string; points: Points;
}
interface Points { ear: { x: number; y: number }; shoulder: { x: number; y: number }; }

export default function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [points, setPoints] = useState<Points | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<'ear' | 'shoulder' | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState<'download' | 'share' | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveImageUrl, setSaveImageUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const poseModelRef = useRef<any>(null);

  // Initialize MediaPipe Pose
  useEffect(() => {
    if (window.Pose) {
      const pose = new window.Pose({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
      pose.setOptions({ modelComplexity: 1, smoothLandmarks: false, minDetectionConfidence: 0.3, minTrackingConfidence: 0.3 });
      pose.onResults(onPoseResults);
      poseModelRef.current = pose;
    }
  }, []);

  // Optimize Image Loading
  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => setLoadedImage(img);
    } else {
      setLoadedImage(null);
    }
  }, [imageSrc]);

  const showToast = (msg: string) => { setToastMessage(msg); setIsToastVisible(true); setTimeout(() => setIsToastVisible(false), 3000); };

  // Draw Canvas
  useEffect(() => {
    if (canvasRef.current && loadedImage && points) {
       const canvas = canvasRef.current; 
       const ctx = canvas.getContext('2d');
       if (ctx) {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           // Draw Image
           ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);
           
           // Draw Overlay
           ctx.fillStyle = 'rgba(0,0,0,0.15)'; // Slightly darker for contrast
           ctx.fillRect(0, 0, canvas.width, canvas.height);

           const ex = points.ear.x * canvas.width, ey = points.ear.y * canvas.height;
           const sx = points.shoulder.x * canvas.width, sy = points.shoulder.y * canvas.height;
           
           // Connector Line
           ctx.beginPath(); ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; ctx.lineWidth = 4; ctx.setLineDash([8, 6]);
           ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
           
           drawControlPoint(ctx, ex, ey, '#ef4444');
           drawControlPoint(ctx, sx, sy, '#22c55e');
       }
    }
  }, [points, loadedImage]);

  const drawControlPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    // Outer touch area glow (HUGE for accessibility)
    ctx.beginPath(); ctx.arc(x, y, 60, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.globalAlpha = 0.2; ctx.fill(); ctx.globalAlpha = 1.0;
    
    // Middle glow
    ctx.beginPath(); ctx.arc(x, y, 35, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.globalAlpha = 0.4; ctx.fill(); ctx.globalAlpha = 1.0;

    // Inner solid dot (Bigger)
    ctx.beginPath(); ctx.arc(x, y, 20, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill(); 
    ctx.strokeStyle = 'white'; ctx.lineWidth = 5; ctx.stroke();
    
    // Center white dot
    ctx.beginPath(); ctx.arc(x, y, 6, 0, 2 * Math.PI); ctx.fillStyle = 'white'; ctx.fill();
  };

  // Helper to map Client Coordinates to Canvas Image Coordinates with object-fit:contain support
  const getCanvasCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const canvasAspect = canvas.width / canvas.height;
    const rectAspect = rect.width / rect.height;

    let drawWidth, drawHeight, offsetX, offsetY, scale;

    if (canvasAspect > rectAspect) {
      // Image is wider than container (constrained by width) -> Bars on Top/Bottom
      drawWidth = rect.width;
      drawHeight = drawWidth / canvasAspect;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
      scale = canvas.width / drawWidth; // Canvas Pixels per Visual Pixel
    } else {
      // Image is taller than container (constrained by height) -> Bars on Left/Right
      drawHeight = rect.height;
      drawWidth = drawHeight * canvasAspect;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
      scale = canvas.height / drawHeight;
    }

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    return {
      x: (clientX - offsetX) * scale,
      y: (clientY - offsetY) * scale
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file); setImageSrc(url); setResult(null); setPoints(null);
    const img = new Image(); img.src = url; img.onload = () => processImage(img);
  };

  const processImage = async (image: HTMLImageElement) => {
    setIsAnalyzing(true); if (poseModelRef.current) { await poseModelRef.current.reset(); await poseModelRef.current.send({ image }); }
    setIsAnalyzing(false);
  };

  const onPoseResults = (results: any) => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.width = results.image.width; canvas.height = results.image.height;
    let detectedPoints = { ear: { x: 0.5, y: 0.3 }, shoulder: { x: 0.5, y: 0.6 } };
    if (results.poseLandmarks) {
      const l = results.poseLandmarks;
      const side = (l[7].visibility || 0) + (l[11].visibility || 0) > (l[8].visibility || 0) + (l[12].visibility || 0);
      const e = side ? l[7] : l[8], s = side ? l[11] : l[12];
      if (e.visibility > 0.3 && s.visibility > 0.3) detectedPoints = { ear: { x: e.x, y: e.y }, shoulder: { x: s.x, y: s.y } };
    }
    setPoints(detectedPoints);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!points || !canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Use the corrected coordinate mapper
    const { x: clickX, y: clickY } = getCanvasCoordinates(e);

    // Hit detection radius (scaled to canvas resolution)
    const minDim = Math.min(canvas.width, canvas.height);
    const hitRadius = Math.max(100, minDim * 0.15); // 15% of screen or 100px

    const dE = Math.hypot(clickX - points.ear.x * canvas.width, clickY - points.ear.y * canvas.height);
    const dS = Math.hypot(clickX - points.shoulder.x * canvas.width, clickY - points.shoulder.y * canvas.height);

    if (dE < hitRadius) { setDraggingPoint('ear'); canvas.setPointerCapture(e.pointerId); }
    else if (dS < hitRadius) { setDraggingPoint('shoulder'); canvas.setPointerCapture(e.pointerId); }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingPoint || !points || !canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Use the corrected coordinate mapper
    const { x: moveX, y: moveY } = getCanvasCoordinates(e);

    const nx = Math.min(Math.max(moveX / canvas.width, 0), 1);
    const ny = Math.min(Math.max(moveY / canvas.height, 0), 1);
    
    setPoints(p => p ? { ...p, [draggingPoint]: { x: nx, y: ny } } : null);
  };

  const handleConfirmPoints = () => {
    if (!points || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const deltaX = Math.abs(points.ear.x - points.shoulder.x) * canvas.width, deltaY = (points.shoulder.y - points.ear.y) * canvas.height;
    const angleDeg = Math.round(Math.atan2(deltaX, Math.max(1, deltaY)) * (180 / Math.PI));
    let load = "5kg", level = 0, levelTitle = "", description = "", color = "";
    
    if (angleDeg <= 5) { 
      level = 0; 
      levelTitle = "LV.0 탈거북 휴먼"; 
      description = "교과서 표본이네요. 혹시, 폰 안 쓰십니까?";
      color = "#3b82f6"; 
      load = "5kg"; 
    } else if (angleDeg <= 15) { 
      level = 1; 
      levelTitle = "LV.1 아기거북이"; 
      description = "아직은 사람 목입니다. 두 턱 만들기 10번씩 하세요!";
      color = "#22c55e"; 
      load = "12kg"; 
    } else if (angleDeg <= 30) { 
      level = 2; 
      levelTitle = "LV.2 수험생 거북이"; 
      description = "목 위에 볼링공 하나 얹고 사시네요. 어깨 안아프십니까?";
      color = "#eab308"; 
      load = "18kg"; 
    } else if (angleDeg <= 45) { 
      level = 3; 
      levelTitle = "LV.3 거북도사"; 
      description = "이 정도면 척추가 주인을 고소해도 법적으로 할 말 없습니다.";
      color = "#f97316"; 
      load = "22kg"; 
    } else { 
      level = 4; 
      levelTitle = "LV.4 닌자거북이"; 
      description = "당신은 인류의 진화를 정면으로 거스른 닌자거북이.";
      color = "#ef4444"; 
      if (angleDeg > 60) {
        load = "27kg 이상";
      } else {
        load = "27kg";
      }
    }
    setResult({ angle: angleDeg, weight: load, level, levelTitle, description, color, points });
  };

  const createResultCanvas = async (): Promise<HTMLCanvasElement> => {
    const shareCanvas = document.createElement('canvas'); const ctx = shareCanvas.getContext('2d')!;
    const img = new Image(); img.src = imageSrc!; await new Promise((resolve) => { img.onload = resolve; });
    
    // Canvas setup
    shareCanvas.width = 1080; shareCanvas.height = 1920; 
    ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, shareCanvas.width, shareCanvas.height);
    
    // 1. Photo Area (Top 45% - Adjusted from 55%)
    const photoHeight = shareCanvas.height * 0.45;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, shareCanvas.width, photoHeight); ctx.clip();
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, shareCanvas.width, photoHeight);
    
    ctx.globalAlpha = 0.3;
    const imgRatio = img.width / img.height;
    const canvasRatio = shareCanvas.width / photoHeight;
    let drawW, drawH, drawX, drawY;
    if (imgRatio > canvasRatio) { drawH = photoHeight; drawW = drawH * imgRatio; drawX = (shareCanvas.width - drawW) / 2; drawY = 0; } 
    else { drawW = shareCanvas.width; drawH = drawW / imgRatio; drawX = 0; drawY = (photoHeight - drawH) / 2; }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.globalAlpha = 1.0;

    // Draw Guide Lines
    const relX = (val: number) => drawX + (val * drawW);
    const relY = (val: number) => drawY + (val * drawH);
    const ex = relX(result!.points.ear.x); const ey = relY(result!.points.ear.y);
    const sx = relX(result!.points.shoulder.x); const sy = relY(result!.points.shoulder.y);

    // Vertical Reference Line
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy - 250); 
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.stroke(); ctx.setLineDash([]);

    // Angle Arc
    const radius = 140; const startAngle = -Math.PI / 2;
    const isEarRight = ex > sx;
    const angleRad = result!.angle * (Math.PI / 180);
    const endAngle = startAngle + (isEarRight ? angleRad : -angleRad);

    ctx.beginPath(); ctx.moveTo(sx, sy);
    ctx.arc(sx, sy, radius, startAngle, endAngle, !isEarRight); 
    ctx.lineTo(sx, sy); 
    ctx.fillStyle = 'rgba(239, 68, 68, 0.25)'; ctx.fill();
    ctx.beginPath(); ctx.arc(sx, sy, radius, startAngle, endAngle, !isEarRight); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.stroke();

    const textAngle = startAngle + (isEarRight ? angleRad / 2 : -angleRad / 2);
    const textDist = radius + 60;
    ctx.font = '900 60px Inter'; ctx.fillStyle = '#ef4444'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = 'white'; ctx.shadowBlur = 10;
    ctx.fillText(`${result!.angle}°`, sx + Math.cos(textAngle) * textDist, sy + Math.sin(textAngle) * textDist); ctx.shadowBlur = 0;

    // Connector & Dots
    ctx.beginPath(); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 15; ctx.setLineDash([25, 20]); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(ex, ey, 30, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.beginPath(); ctx.arc(ex, ey, 45, 0, Math.PI * 2); ctx.strokeStyle = 'white'; ctx.lineWidth = 6; ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, 30, 0, Math.PI * 2); ctx.fillStyle = '#22c55e'; ctx.fill();
    ctx.beginPath(); ctx.arc(sx, sy, 45, 0, Math.PI * 2); ctx.strokeStyle = 'white'; ctx.lineWidth = 6; ctx.stroke();
    
    // Labels on Result Canvas
    ctx.font = 'bold 60px Inter, sans-serif'; ctx.fillStyle = 'white'; ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 15; ctx.textBaseline = 'middle';
    const isEarRightLabel = result!.points.ear.x > 0.65; const isShoulderRightLabel = result!.points.shoulder.x > 0.65;
    ctx.textAlign = isEarRightLabel ? 'right' : 'left'; ctx.fillText("👂 EAR", ex + (isEarRightLabel ? -60 : 60), ey);
    ctx.textAlign = isShoulderRightLabel ? 'right' : 'left'; ctx.fillText("💪 SHOULDER", sx + (isShoulderRightLabel ? -60 : 60), sy);
    ctx.shadowBlur = 0; ctx.restore();

    // Separator
    ctx.fillStyle = result!.color; ctx.fillRect(0, photoHeight - 10, shareCanvas.width, 20);

    // 2. Result Area (Utilize more space from 55% bottom)
    // Reduce gap significantly here (from +80 to +20)
    const contentY = photoHeight + 20;
    
    // Turtle
    const svgElement = document.getElementById(`turtle-svg-${result!.level}`);
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const turtleImg = new Image(); turtleImg.src = svgUrl;
      await new Promise(r => turtleImg.onload = r);
      ctx.drawImage(turtleImg, shareCanvas.width / 2 - 180, contentY, 360, 360);
      URL.revokeObjectURL(svgUrl);
    }

    // Level Title
    // Increase gap between turtle and text to prevent overlap
    // Turtle bottom is contentY + 360.
    // Text baseline at contentY + 450 (90px gap from image bottom, 90px font size area)
    const titleY = contentY + 450;
    ctx.textAlign = 'center';
    ctx.fillStyle = result!.color; ctx.font = '900 90px Inter, sans-serif';
    ctx.fillText(result!.levelTitle, shareCanvas.width / 2, titleY);
    
    // Description (New)
    const descY = titleY + 70;
    ctx.fillStyle = '#475569'; ctx.font = '500 40px Inter, sans-serif';
    ctx.fillText(`"${result!.description}"`, shareCanvas.width / 2, descY);

    // Stats Box
    const boxY = descY + 60;
    ctx.fillStyle = '#f1f5f9'; ctx.roundRect(100, boxY, 880, 200, 40); ctx.fill();
    ctx.fillStyle = '#475569'; ctx.font = 'bold 50px Inter';
    ctx.fillText("목 각도", 320, boxY + 80); ctx.fillText("경추 하중", 760, boxY + 80);
    ctx.fillStyle = '#1e293b'; ctx.font = '900 80px Inter';
    ctx.fillText(`${result!.angle}°`, 320, boxY + 160); 
    
    // Dynamic Font Size for Weight
    const weightText = result!.weight;
    if (weightText.length > 5) {
        ctx.font = '900 60px Inter';
    } else {
        ctx.font = '900 80px Inter';
    }
    ctx.fillText(weightText, 760, boxY + 160);

    // Footer
    ctx.fillStyle = '#94a3b8'; ctx.font = '500 36px Inter';
    ctx.fillText('당신의 목 건강 지킴이, 거북목 레벨테스트 🐢', shareCanvas.width / 2, shareCanvas.height - 90);
    ctx.fillStyle = '#cbd5e1'; ctx.font = '500 28px Inter';
    ctx.fillText('Created by @acedoctor2026', shareCanvas.width / 2, shareCanvas.height - 40);

    return shareCanvas;
  };

  const handleSaveImage = async () => {
    if (!result) return; 
    setIsProcessingAction('download');
    try {
      const canvas = await createResultCanvas();
      const url = canvas.toDataURL('image/png');
      setSaveImageUrl(url);
      setShowSaveModal(true);
    } catch (err) { 
      showToast('이미지 생성에 실패했습니다.'); 
    } finally { 
      setIsProcessingAction(null); 
    }
  };

  const closeSaveModal = () => {
    setShowSaveModal(false);
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `[거북목 레벨테스트]\n내 레벨: ${result.levelTitle}\n"${result.description}"\n\n🐢 지금 바로 측정해보세요!`;
    const shareUrl = window.location.origin + window.location.pathname;
    try {
      if (navigator.share && navigator.canShare && navigator.canShare({ text: shareText, url: shareUrl })) { 
        await navigator.share({ title: '거북목 레벨테스트', text: shareText, url: shareUrl }); 
      } else { throw new Error('NotSupported'); }
    } catch (err) {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      showToast('결과가 클립보드에 복사되었습니다!');
    }
  };

  const resetAll = () => { setImageSrc(null); setResult(null); setPoints(null); setLoadedImage(null); };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10 select-none overflow-x-hidden text-slate-900 flex flex-col">
      <div className="hidden">
        {[0,1,2,3,4].map(l => ( <TurtleCharacter key={l} id={`turtle-svg-${l}`} level={l} size={400} /> ))}
      </div>

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-5 py-3 flex justify-between items-center max-w-md mx-auto w-full shadow-sm">
        <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
          🐢 거북목 레벨테스트
        </h1>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-100">@acedoctor2026</span>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 flex-1 w-full">
        {!imageSrc ? (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
              <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-emerald-50/50">
                <TurtleCharacter level={1} size={80} />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2">당신의 목은 안녕하십니까?</h2>
              <p className="text-slate-500 text-xs mb-6 leading-relaxed">AI가 3초만에 거북목 레벨을 진단합니다.<br/>지금 바로 확인해보세요!</p>
              
              <div className="flex flex-col gap-2.5">
                <button onClick={() => cameraInputRef.current?.click()} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-2.5">
                  <Camera className="w-5 h-5" /> 카메라로 측정
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-xl font-bold text-base hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2.5">
                  <ImageIcon className="w-5 h-5" /> 앨범에서 선택
                </button>
              </div>
            </div>
            <PhotoGuide />
            <div className="text-center mt-2">
               <p className="text-[10px] text-slate-400">Created by <span className="font-bold">@acedoctor2026</span></p>
            </div>
            <input type="file" ref={cameraInputRef} className="hidden" capture="environment" accept="image/*" onChange={handleFileUpload} />
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* Analysis View */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-[3/4] ring-4 ring-white">
              <canvas ref={canvasRef} onPointerDown={!result ? handlePointerDown : undefined} onPointerMove={!result ? handlePointerMove : undefined} onPointerUp={() => setDraggingPoint(null)} className="w-full h-full object-contain touch-none" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                  <RefreshCcw className="w-10 h-10 animate-spin mb-4 opacity-80" />
                  <p className="font-bold tracking-widest text-xs opacity-80 animate-pulse">AI ANALYZING...</p>
                </div>
              )}
              {!result && !isAnalyzing && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 pointer-events-none">
                  <MousePointer2 className="w-3.5 h-3.5 text-emerald-400" /> 드래그하여 귀와 어깨를 맞춰주세요
                </div>
              )}
            </div>

            {!result && !isAnalyzing && (
              <>
                {/* Clean Dot Legend */}
                <div className="flex justify-center items-center gap-8 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-100"></div>
                    <span className="text-sm font-bold text-slate-700">귀 (Ear)</span>
                  </div>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
                    <span className="text-sm font-bold text-slate-700">어깨 (Shoulder)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button onClick={resetAll} className="col-span-1 py-4 text-slate-500 font-bold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm">재촬영</button>
                  <button onClick={handleConfirmPoints} className="col-span-2 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                    결과 확인하기 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {result && (
              <div className="space-y-4">
                 {/* Result Card */}
                <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border-2 overflow-hidden relative" style={{ borderColor: result.color }}>
                   <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" style={{ backgroundColor: result.color }} />
                   
                   <div className="flex flex-col">
                     <div className="flex items-center justify-between mb-4">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-full text-[10px] font-black text-slate-500 tracking-wider uppercase">Result</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-400">LV.{result.level}</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 mb-4">
                        <div className="relative shrink-0">
                           <div className="bg-slate-50 w-24 h-24 rounded-2xl flex items-center justify-center border border-slate-100">
                              <TurtleCharacter level={result.level} size={80} />
                           </div>
                           <div className="absolute -bottom-1 -right-1 bg-white px-1.5 py-0.5 rounded border shadow-sm text-[10px] font-black" style={{ color: result.color, borderColor: result.color }}>LV.{result.level}</div>
                        </div>
                        <div className="flex-1">
                           <h2 className="text-xl font-black text-slate-900 leading-tight mb-2 break-keep">{result.levelTitle}</h2>
                           {/* Description Block (New) */}
                           <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 relative mt-1">
                              <Quote className="w-4 h-4 text-slate-300 absolute -top-2 -left-1 fill-slate-100" />
                              <p className="text-[11px] font-bold text-slate-600 leading-relaxed text-center break-keep">
                                "{result.description}"
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Stats (Compact Grid) */}
                     <div className="grid grid-cols-2 gap-2 mb-4">
                       <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                         <p className="text-[9px] font-bold text-slate-400 uppercase">Angle</p>
                         <p className="text-base font-black text-slate-800">{result.angle}°</p>
                       </div>
                       <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                         <p className="text-[9px] font-bold text-slate-400 uppercase">Load</p>
                         <p className="text-base font-black text-slate-800">{result.weight}</p>
                       </div>
                     </div>
                     
                     <div className="w-full h-px bg-slate-100" />
                     <NeckLoadChart activeAngle={result.angle} />
                   </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button onClick={handleSaveImage} disabled={!!isProcessingAction} className="bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-70 transition-all flex items-center justify-center gap-2">
                    {isProcessingAction === 'download' ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    저장
                  </button>
                  <button onClick={handleShare} className="bg-white border border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> 공유
                  </button>
                </div>
                <button onClick={resetAll} className="w-full py-3 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">처음으로 돌아가기</button>
                
                <div className="text-center pb-2">
                   <p className="text-[9px] text-slate-300">Created by @acedoctor2026</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Save Modal */}
      {showSaveModal && saveImageUrl && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fade-in" onClick={closeSaveModal}>
          <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
             <button onClick={closeSaveModal} className="absolute -top-4 -right-4 bg-slate-900 text-white p-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors">
               <X className="w-5 h-5" />
             </button>
             <img src={saveImageUrl} className="w-full rounded-xl border border-slate-100 shadow-sm" alt="결과 이미지" />
             <div className="text-center mt-4 mb-2">
                <p className="font-bold text-slate-900 text-lg">결과 이미지 저장</p>
                <p className="text-slate-500 text-sm mt-1">이미지를 꾹 눌러 앨범에 저장하세요 📸</p>
                <p className="text-slate-400 text-[10px] mt-0.5">(아이폰/갤럭시 모두 가능)</p>
             </div>
             <button onClick={closeSaveModal} className="w-full bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl mt-3 hover:bg-slate-200 transition-colors">닫기</button>
          </div>
        </div>
      )}
      
      <Toast message={toastMessage} visible={isToastVisible} />
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
