import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Share2, AlertCircle, RefreshCcw, CheckCircle2, MousePointer2,
  Image as ImageIcon, Download, Copy
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

// --- Medical Infographic Component ---
const NeckLoadChart = ({ activeAngle }: { activeAngle: number }) => {
  const data = [
    { angle: 0, weight: '4.5~5.4kg', label: '0°' },
    { angle: 15, weight: '12.2kg', label: '15°' },
    { angle: 30, weight: '18.1kg', label: '30°' },
    { angle: 45, weight: '22.2kg', label: '45°' },
    { angle: 60, weight: '27.2kg', label: '60°' }
  ];

  const getHighlightColor = (angle: number) => {
    if (activeAngle <= 5 && angle === 0) return 'rgba(59, 130, 246, 0.15)';
    if (activeAngle > 5 && activeAngle <= 15 && angle === 15) return 'rgba(34, 197, 94, 0.15)';
    if (activeAngle > 15 && activeAngle <= 30 && angle === 30) return 'rgba(234, 179, 8, 0.15)';
    if (activeAngle > 30 && activeAngle <= 45 && angle === 45) return 'rgba(249, 115, 22, 0.15)';
    if (activeAngle > 45 && angle === 60) return 'rgba(239, 68, 68, 0.15)';
    return 'transparent';
  };

  const getBorderColor = (angle: number) => {
    if (activeAngle <= 5 && angle === 0) return '#3b82f6';
    if (activeAngle > 5 && activeAngle <= 15 && angle === 15) return '#22c55e';
    if (activeAngle > 15 && activeAngle <= 30 && angle === 30) return '#eab308';
    if (activeAngle > 30 && activeAngle <= 45 && angle === 45) return '#f97316';
    if (activeAngle > 45 && angle === 60) return '#ef4444';
    return '#f1f5f9';
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-4 px-1">
        <h4 className="text-[11px] font-bold text-gray-800 flex items-center gap-1 whitespace-nowrap">
           <AlertCircle className="w-3.5 h-3.5 text-turtle-500" />
           목 각도에 따른 경추 하중 변화
        </h4>
        <span className="text-[8px] text-gray-400 whitespace-nowrap">자료: Dr. Hansraj</span>
      </div>
      
      <div className="flex justify-between gap-0.5">
        {data.map((item) => (
          <div 
            key={item.angle} 
            className="flex-1 flex flex-col items-center p-1 rounded-lg border transition-all duration-300 min-w-0"
            style={{ 
              backgroundColor: getHighlightColor(item.angle),
              borderColor: getBorderColor(item.angle),
              transform: getHighlightColor(item.angle) !== 'transparent' ? 'scale(1.03)' : 'scale(1)',
            }}
          >
            <span className="text-[7.5px] font-black text-gray-900 mb-0.5 whitespace-nowrap leading-none">
              {item.weight}
            </span>
            <span className="text-[12px] font-black text-slate-400 mb-1.5 whitespace-nowrap leading-none">
              {item.label}
            </span>
            
            <svg viewBox="0 0 40 65" className="w-full h-auto max-w-[45px]">
              <path d="M20,25 Q20,45 20,60" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" fill="none" />
              <g style={{ transform: `rotate(${item.angle}deg)`, transformOrigin: '20px 25px' }}>
                <circle cx="20" cy="15" r="9" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                <path d="M20,15 L20,5" stroke={getBorderColor(item.angle)} strokeWidth="2.5" strokeDasharray="2 1.5" />
                <rect x="5" y="10" width="3" height="7" rx="0.5" fill="#94a3b8" />
              </g>
              <circle cx="20" cy="25" r="2.5" fill={getBorderColor(item.angle)} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

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
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="80" fill={level === 0 ? "url(#shell-gold)" : "#d9f99d"} filter="url(#shadow)" />
      <text x="100" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">LV.{level}</text>
    </svg>
  );
};

// --- Photo Guide Component ---
const PhotoGuide = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-turtle-100 shadow-sm mb-4">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
        <Camera className="w-4 h-4 mr-2 text-turtle-600" />
        정확한 측정을 위한 촬영 지침
      </h3>
      <ul className="text-[11px] text-gray-600 space-y-2 bg-gray-50 p-3 rounded-xl">
        <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500" /> 상반신 옆모습이 전체적으로 나오게 찍어주세요.</li>
        <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500" /> 귓구멍과 어깨가 가려지지 않아야 합니다.</li>
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
  originalImage: string; 
  points: Points;
}

interface Points {
  ear: { x: number; y: number };
  shoulder: { x: number; y: number };
}

export default function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [points, setPoints] = useState<Points | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<'ear' | 'shoulder' | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState<'download' | 'share' | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const poseModelRef = useRef<any>(null);

  useEffect(() => {
    if (window.Pose) {
      const pose = new window.Pose({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });
      pose.setOptions({ modelComplexity: 1, smoothLandmarks: false, minDetectionConfidence: 0.3, minTrackingConfidence: 0.3 });
      pose.onResults(onPoseResults);
      poseModelRef.current = pose;
    }
  }, []);

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
           const ex = points.ear.x * canvas.width, ey = points.ear.y * canvas.height;
           const sx = points.shoulder.x * canvas.width, sy = points.shoulder.y * canvas.height;
           ctx.beginPath(); ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'; ctx.lineWidth = 6; ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
           drawControlPoint(ctx, ex, ey, '#ef4444', '👂 EAR', points.ear.x);
           drawControlPoint(ctx, sx, sy, '#22c55e', '💪 SHOULDER', points.shoulder.x);
         }
       };
    }
  }, [points, imageSrc]);

  const drawControlPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, label: string, ratioX: number) => {
    ctx.beginPath(); ctx.arc(x, y, 30, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.globalAlpha = 0.4; ctx.fill(); ctx.globalAlpha = 1.0;
    ctx.beginPath(); ctx.arc(x, y, 12, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill(); ctx.strokeStyle = 'white'; ctx.lineWidth = 3; ctx.stroke();
    
    const isTooCloseToRight = ratioX > 0.65;
    ctx.font = 'bold 28px Arial'; 
    ctx.textAlign = isTooCloseToRight ? 'right' : 'left'; 
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(0,0,0,0.5)';
    
    const offset = isTooCloseToRight ? -45 : 45;
    ctx.fillText(label, x + offset, y);
    ctx.shadowBlur = 0;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url); setResult(null); setPoints(null);
    const img = new Image(); img.src = url; img.onload = () => processImage(img);
  };

  const processImage = async (image: HTMLImageElement) => {
    setIsAnalyzing(true);
    if (poseModelRef.current) {
      await poseModelRef.current.reset();
      await poseModelRef.current.send({ image });
    }
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
    const canvas = canvasRef.current; const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const clickX = (e.clientX - rect.left) * scale, clickY = (e.clientY - rect.top) * scale;
    const dE = Math.hypot(clickX - points.ear.x * canvas.width, clickY - points.ear.y * canvas.height);
    const dS = Math.hypot(clickX - points.shoulder.x * canvas.width, clickY - points.shoulder.y * canvas.height);
    if (dE < 80) { setDraggingPoint('ear'); canvas.setPointerCapture(e.pointerId); }
    else if (dS < 80) { setDraggingPoint('shoulder'); canvas.setPointerCapture(e.pointerId); }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingPoint || !points || !canvasRef.current) return;
    const canvas = canvasRef.current; const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const nx = Math.min(Math.max((e.clientX - rect.left) * scale / canvas.width, 0), 1);
    const ny = Math.min(Math.max((e.clientY - rect.top) * scale / canvas.height, 0), 1);
    setPoints(p => p ? { ...p, [draggingPoint]: { x: nx, y: ny } } : null);
  };

  const handleConfirmPoints = () => {
    if (!points || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ex = points.ear.x * canvas.width, ey = points.ear.y * canvas.height;
    const sx = points.shoulder.x * canvas.width, sy = points.shoulder.y * canvas.height;
    const deltaX = Math.abs(ex - sx), deltaY = sy - ey;
    const angleDeg = Math.round(Math.atan2(deltaX, Math.max(1, deltaY)) * (180 / Math.PI));
    let load = 5;
    if (angleDeg <= 5) load = 5; else if (angleDeg <= 15) load = 12.2; else if (angleDeg <= 30) load = 18.1; else if (angleDeg <= 45) load = 22.2; else load = 27.2;
    
    let level = 0, levelTitle = "", message = "", color = "";
    if (angleDeg <= 5) { level = 0; levelTitle = "LV.0 탈거북 휴먼"; message = "완벽한 건강 상태입니다!"; color = "#3b82f6"; }
    else if (angleDeg <= 15) { level = 1; levelTitle = "LV.1 아기 거북이"; message = "약간의 주의가 필요합니다."; color = "#22c55e"; }
    else if (angleDeg <= 30) { level = 2; levelTitle = "LV.2 만년 수험생"; message = "목에 무리가 가고 있어요!"; color = "#eab308"; }
    else if (angleDeg <= 45) { level = 3; levelTitle = "LV.3 거북 도사"; message = "적극적인 교정이 필요합니다."; color = "#f97316"; }
    else { level = 4; levelTitle = "LV.MAX 닌자 거북이"; message = "전문가 상담이 시급합니다!"; color = "#ef4444"; }
    
    const original = canvas.toDataURL('image/jpeg', 0.9);
    setResult({ angle: angleDeg, weight: load, message, level, levelTitle, color, originalImage: original, points });
  };

  const createResultCanvas = async (): Promise<HTMLCanvasElement> => {
    const shareCanvas = document.createElement('canvas');
    const ctx = shareCanvas.getContext('2d')!;
    const img = new Image();
    img.src = imageSrc!;
    await new Promise((resolve) => { img.onload = resolve; });
    
    shareCanvas.width = 1080;
    shareCanvas.height = 1440;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, shareCanvas.width, shareCanvas.height);
    
    ctx.globalAlpha = 0.35;
    const imgRatio = img.width / img.height;
    const targetW = shareCanvas.width;
    const targetH = targetW / imgRatio;
    ctx.drawImage(img, 0, (shareCanvas.height - targetH) / 2, targetW, targetH);
    
    ctx.globalAlpha = 1.0;
    const ex = result!.points.ear.x * shareCanvas.width;
    const ey = (result!.points.ear.y * targetH) + (shareCanvas.height - targetH) / 2;
    const sx = result!.points.shoulder.x * shareCanvas.width;
    const sy = (result!.points.shoulder.y * targetH) + (shareCanvas.height - targetH) / 2;
    
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.setLineDash([20, 15]);
    ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
    ctx.stroke();
    
    ctx.beginPath(); ctx.arc(ex, ey, 25, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.beginPath(); ctx.arc(sx, sy, 25, 0, Math.PI * 2); ctx.fillStyle = '#22c55e'; ctx.fill();
    
    ctx.font = 'bold 44px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    
    const isEarRight = result!.points.ear.x > 0.6;
    ctx.textAlign = isEarRight ? 'right' : 'left';
    ctx.fillText('👂 EAR', ex + (isEarRight ? -50 : 50), ey);
    
    const isShoulderRight = result!.points.shoulder.x > 0.6;
    ctx.textAlign = isShoulderRight ? 'right' : 'left';
    ctx.fillText('💪 SHOULDER', sx + (isShoulderRight ? -50 : 50), sy);
    
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.roundRect(50, shareCanvas.height - 300, shareCanvas.width - 100, 250, 40);
    ctx.fill();
    
    ctx.fillStyle = result!.color;
    ctx.font = 'bold 75px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(result!.levelTitle, shareCanvas.width / 2, shareCanvas.height - 180);
    
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 42px Arial';
    ctx.fillText(`ANGLE: ${result!.angle}° | LOAD: ${result!.weight}kg`, shareCanvas.width / 2, shareCanvas.height - 90);
    
    return shareCanvas;
  };

  const handleDownload = async () => {
    if (!result) return;
    setIsProcessingAction('download');
    try {
      const canvas = await createResultCanvas();
      const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'));
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `turtle-neck-${result.angle}deg.png`;
      link.click();
    } catch (err) {
      console.error(err);
      alert('이미지 생성 실패');
    } finally {
      setIsProcessingAction(null);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const shareTitle = '거북목 레벨테스트 결과';
    const shareText = `[거북목 레벨테스트] 내 결과는? [${result.levelTitle}]! 측정 각도 ${result.angle}°, 목 하중 ${result.weight}kg입니다. 당신의 목 건강도 체크해보세요! 🐢`;
    const shareUrl = window.location.href;

    try {
      // 1. Native Share 시도 (시스템 공유창)
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
      } else {
        throw new Error('Native Share not supported');
      }
    } catch (err) {
      // 2. Fallback: 클립보드 복사 (공유창이 취소된 게 아닌 실제 실패인 경우만 안내)
      if ((err as Error).name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('공유 기능이 지원되지 않는 환경이라 결과 요약을 클립보드에 복사했습니다! 원하시는 곳에 붙여넣어 공유해주세요. 📋');
        } catch (clipErr) {
          alert('공유 및 복사에 실패했습니다. 결과를 직접 캡처하거나 입력하여 공유해주세요.');
        }
      }
    }
  };

  const resetAll = () => { setImageSrc(null); setResult(null); setPoints(null); };

  return (
    <div className="min-h-screen bg-turtle-50 font-sans pb-20">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-turtle-100 px-4 py-3 flex justify-between items-center max-w-md mx-auto">
        <h1 className="text-lg font-bold text-turtle-900">🐢 거북목 레벨테스트</h1>
        <div className="bg-turtle-600 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-sm tracking-tighter">AI PRO</div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {!imageSrc ? (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-turtle-100 flex flex-col items-center animate-fade-in">
            <TurtleCharacter level={1} className="w-40 h-40 mb-6 animate-bounce-slow" />
            <PhotoGuide />
            <button onClick={() => cameraInputRef.current?.click()} className="w-full bg-turtle-600 text-white py-5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 mb-3 active:scale-95 transition-all">
              <Camera className="w-6 h-6" /> 측정 시작하기
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-turtle-100 text-turtle-700 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
              <ImageIcon className="w-6 h-6" /> 앨범에서 선택
            </button>
            <input type="file" ref={cameraInputRef} className="hidden" capture="environment" onChange={handleFileUpload} />
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] touch-none border border-slate-800">
              <canvas ref={canvasRef} onPointerDown={!result ? handlePointerDown : undefined} onPointerMove={!result ? handlePointerMove : undefined} onPointerUp={() => setDraggingPoint(null)} className="w-full h-full object-contain" />
              {isAnalyzing && <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white"><p className="text-xl font-black animate-pulse tracking-widest uppercase">SCANNING SPINE...</p></div>}
            </div>

            {!result && !isAnalyzing && (
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-turtle-100 text-center">
                <p className="text-sm font-bold text-gray-500 mb-6 flex items-center justify-center gap-2">
                   <MousePointer2 className="w-4 h-4 text-turtle-500" /> 포인트를 귓구멍과 어깨에 맞추세요
                </p>
                <div className="flex gap-3">
                  <button onClick={resetAll} className="flex-1 py-4 text-gray-400 font-bold border-2 rounded-2xl active:scale-95 transition-all">다시 촬영</button>
                  <button onClick={handleConfirmPoints} className="flex-[2] py-4 bg-turtle-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">분석 완료</button>
                </div>
              </div>
            )}

            {result && (
              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-b-8 relative animate-fade-in" style={{ borderColor: result.color }}>
                <div className="text-center mb-6">
                  <p className="text-gray-400 text-[9px] font-bold tracking-[0.2em] uppercase mb-1">Diagnostic Report</p>
                  <h2 className="text-3xl font-black mb-1" style={{ color: result.color }}>{result.levelTitle}</h2>
                  
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 my-6 bg-slate-900 shadow-inner">
                    <img src={result.originalImage} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="bg" />
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
                      <line x1={result.points.shoulder.x * 100} y1={result.points.shoulder.y * 100} x2={result.points.ear.x * 100} y2={result.points.ear.y * 100} stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeDasharray="3 2" />
                      <circle cx={result.points.ear.x * 100} cy={result.points.ear.y * 100} r="2.5" fill="#ef4444" stroke="white" strokeWidth="0.6" />
                      <circle cx={result.points.shoulder.x * 100} cy={result.points.shoulder.y * 100} r="2.5" fill="#22c55e" stroke="white" strokeWidth="0.6" />
                      <text 
                        x={result.points.ear.x * 100 + (result.points.ear.x > 0.65 ? -5 : 5)} 
                        y={result.points.ear.y * 100 + 1.2} 
                        fontSize="4.8" 
                        fill="white" 
                        fontWeight="bold"
                        textAnchor={result.points.ear.x > 0.65 ? "end" : "start"}
                      >👂 EAR</text>
                      <text 
                        x={result.points.shoulder.x * 100 + (result.points.shoulder.x > 0.65 ? -5 : 5)} 
                        y={result.points.shoulder.y * 100 + 1.2} 
                        fontSize="4.8" 
                        fill="white" 
                        fontWeight="bold"
                        textAnchor={result.points.shoulder.x > 0.65 ? "end" : "start"}
                      >💪 SHOULDER</text>
                    </svg>
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[8px] text-white/80 font-bold uppercase tracking-widest">30% Opacity Scan</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><p className="text-[9px] text-gray-400 font-bold tracking-wider">ANGLE</p><p className="text-2xl font-black text-slate-800">{result.angle}°</p></div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><p className="text-[9px] text-gray-400 font-bold tracking-wider">LOAD</p><p className="text-2xl font-black text-slate-800">{result.weight}kg</p></div>
                  </div>
                </div>

                <NeckLoadChart activeAngle={result.angle} />

                <div className="space-y-3 mt-8">
                  <button 
                    onClick={handleDownload} 
                    disabled={!!isProcessingAction}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 transition-all"
                  >
                    {isProcessingAction === 'download' ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    결과 이미지 다운 받기
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-full bg-white border-2 border-slate-200 text-slate-700 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 hover:bg-slate-50 transition-all"
                  >
                    <Share2 className="w-5 h-5 text-turtle-600" />
                    결과 요약 공유하기
                  </button>
                  <button onClick={resetAll} className="w-full text-slate-400 py-4 text-xs font-bold underline active:opacity-50 transition-all">처음으로 돌아가기</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="text-center py-12 opacity-30 text-[10px] max-w-md mx-auto px-10 leading-relaxed font-medium">
        본 진단은 의학적 데이터에 기반한 건강 참고용 분석입니다. <br/> 정기적인 스트레칭과 올바른 자세를 권장합니다.<br/>© 2026 Orthopedic Analysis Lab
      </footer>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
