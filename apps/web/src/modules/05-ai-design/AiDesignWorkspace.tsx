"use client";

import React, { useMemo, useRef, useState } from "react";
import ProjectPanel from "./components/ProjectPanel";
import type { DesignProject } from "./components/ProjectPanel";
import {
  ArrowDownToLine,
  Check,
  ChevronDown,
  Clock3,
  Crop,
  FolderKanban,
  Image as ImageIcon,
  ImagePlus,
  Layers,
  Maximize2,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Monitor,
  Plus,
  Search,
  Send,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

type Photo = {
  id: string;
  name: string;
  url: string;
};

type ChatMessage = {
  id: number;
  role: "user" | "system";
  text: string;
};

type MainTab = "scene" | "banner" | "library";
type ViewMode = "original" | "mockup" | "compare";
type SideTab = "request" | "specs";

export default function AiDesignWorkspace() {
  const uploadRef = useRef<HTMLInputElement>(null);

  const [projectName, setProjectName] = useState("Dự án showroom LED");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState("");
  const [searchProject, setSearchProject] = useState("");

  const [mainTab, setMainTab] = useState<MainTab>("scene");
  const [viewMode, setViewMode] = useState<ViewMode>("original");
  const [sideTab, setSideTab] = useState<SideTab>("request");

  const [zoom, setZoom] = useState(100);
  const [prompt, setPrompt] = useState("");
  const [notice, setNotice] = useState("");

  const [productType, setProductType] = useState("LED trong nhà");
  const [environment, setEnvironment] = useState("Indoor");
  const [pixelPitch, setPixelPitch] = useState("P2.5");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [installation, setInstallation] = useState("Gắn tường");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "system",
      text: "Xin chào! Hãy mô tả ý tưởng thiết kế hoặc yêu cầu điều chỉnh của bạn. Tôi sẽ hỗ trợ ghi nhận yêu cầu.",
    },
  ]);

  const selectedPhoto = useMemo(
    () => photos.find((photo) => photo.id === selectedPhotoId) ?? null,
    [photos, selectedPhotoId]
  );

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    const newPhotos = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    if (newPhotos.length === 0) return;

    setPhotos((current) => [...current, ...newPhotos]);

    if (!selectedPhotoId) {
      setSelectedPhotoId(newPhotos[0].id);
    }

    setViewMode("original");
    setNotice(`Đã thêm ${newPhotos.length} ảnh vào dự án.`);
    event.target.value = "";
  };

  const handleDeletePhoto = (id: string) => {
    const photo = photos.find((item) => item.id === id);

    if (photo) URL.revokeObjectURL(photo.url);

    const remaining = photos.filter((item) => item.id !== id);
    setPhotos(remaining);

    if (selectedPhotoId === id) {
      setSelectedPhotoId(remaining[0]?.id ?? "");
    }

    setNotice("Đã xóa ảnh khỏi phiên làm việc.");
  };

  const handleSendMessage = () => {
    const text = prompt.trim();

    if (!text) {
      setNotice("Bà hãy nhập nội dung yêu cầu trước nhé.");
      return;
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text },
      {
        id: Date.now() + 1,
        role: "system",
        text: "Yêu cầu đã được ghi nhận trên giao diện local. Dịch vụ AI chưa được kết nối nên chưa thực hiện chỉnh sửa hình ảnh.",
      },
    ]);

    setPrompt("");
    setNotice("Đã ghi nhận yêu cầu trong phiên làm việc.");
  };

  const handleCreateDraft = () => {
    setNotice(
      "Chưa kết nối dịch vụ tạo ảnh AI. Bản nháp chưa được tạo."
    );
  };

  const handleDownload = () => {
    if (!selectedPhoto) {
      setNotice("Chưa có ảnh để tải xuống.");
      return;
    }

    const link = document.createElement("a");
    link.href = selectedPhoto.url;
    link.download = selectedPhoto.name;
    link.click();

    setNotice("Đã tải ảnh hiện trạng xuống máy.");
  };

  const filteredProject =
    projectName.toLowerCase().includes(searchProject.toLowerCase());

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F3F5F9] text-[#17243A]">

      {/* HEADER */}

<header className="z-20 flex h-9 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4">
  <h1 className="truncate text-sm font-bold text-[#17243A]">
    Hỗ trợ thiết kế AI
  </h1>

  <div className="flex shrink-0 items-center gap-2">
    <div className="hidden items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-700 sm:flex">
      <span className="h-2 w-2 rounded-full bg-amber-500" />
      Chưa kết nối dịch vụ AI
    </div>

    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-[#1A579F] px-2.5 text-xs font-semibold text-[#1A579F] hover:bg-blue-50"
    >
      <ArrowDownToLine size={14} />
      Tải file
    </button>

    <button
      type="button"
      onClick={() =>
        setNotice("Chưa có bản thiết kế AI hoàn thiện để lưu.")
      }
      className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-[#1755A1] px-3 text-xs font-semibold text-white hover:bg-[#10437F]"
    >
      <Check size={15} />
      Lưu bản hoàn thiện
    </button>

    <button
      type="button"
      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#194C86] text-xs font-bold text-white"
      title="Tài khoản Designer"
    >
      DS
    </button>
  </div>
</header>

      {/* NOTIFICATION */}
      {notice && (
        <div className="flex min-h-7 shrink-0 items-center justify-between border-b border-blue-100 bg-blue-50 px-4 py-1 text-xs text-blue-800">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="font-bold"
            aria-label="Đóng thông báo"
          >
            
          </button>
        </div>
      )}

      {/* MAIN WORKSPACE */}
      <div className="flex min-h-0 flex-1 flex-col xl:flex-row">

        {/* LEFT NAVIGATION */}
        
        {/* LEFT PANEL */}
        <aside className="w-full shrink-0 border-b border-slate-200 bg-white xl:w-[210px] xl:min-h-0 xl:overflow-y-auto xl:border-b-0 xl:border-r">

          <div className="space-y-5 p-4">

            
        <ProjectPanel
            onSelectProject={(project: DesignProject) => {
            setProjectName(project.name);
            setCustomerName(project.customerName);
            setPhone(project.phone);
            setEmail(project.email);
            setAddress(project.address);
  }}
/>


            <div className="border-t border-slate-200" />

            <section>
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-bold">
                  Ảnh hiện trạng <span className="text-red-500">*</span>
                </h3>
                <span className="text-xs text-slate-400">
                  {photos.length} ảnh
                </span>
              </div>

              <p className="mb-3 text-xs text-slate-500">
                Ảnh do bộ phận kỹ thuật cung cấp
              </p>

              <input
                ref={uploadRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-2">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className={`group relative overflow-hidden rounded-lg border-2 ${
                      selectedPhotoId === photo.id
                        ? "border-blue-600"
                        : "border-slate-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPhotoId(photo.id);
                        setViewMode("original");
                      }}
                      className="block aspect-[4/3] w-full"
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="h-full w-full object-cover"
                      />
                    </button>

                    {selectedPhotoId === photo.id && (
                      <span className="absolute right-1 top-1 rounded-full bg-blue-600 p-1 text-white">
                        <Check size={12} />
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="absolute bottom-1 right-1 rounded-md bg-white/95 p-1.5 text-red-600 shadow hover:bg-red-50"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => uploadRef.current?.click()}
                  className="flex aspect-[4/3] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 text-blue-700 hover:border-blue-500 hover:bg-blue-50"
                >
                  <ImagePlus size={24} />
                  <span className="mt-1 text-xs font-semibold">
                    Thêm ảnh
                  </span>
                </button>
              </div>
            </section>

          </div>
        </aside>

        {/* CENTER CANVAS */}
        <main className="flex min-w-0 min-h-0  flex-1  flex-col overflow-hidden bg-[#F3F5F9]">

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-1.5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold">{projectName}</h2>
                <ChevronDown size={17} className="text-slate-400" />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Không gian thiết kế / Module AI Design
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotice("Các tùy chọn dự án đang được phát triển.")
              }
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              title="Tùy chọn"
            >
              <MoreHorizontal size={22} />
            </button>
          </div>

          {/* CENTER TABS */}
          <div className="flex gap-4 border-b border-slate-200 bg-white px-4">
            <button
              type="button"
              onClick={() => setMainTab("scene")}
              className={`border-b-2 px-1 py-2 text-sm font-semibold ${
                mainTab === "scene"
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500"
              }`}
            >
              Phối cảnh AI
            </button>

            <button
              type="button"
              onClick={() => setMainTab("banner")}
              className={`border-b-2 px-1 py-3 text-sm font-semibold ${
                mainTab === "banner"
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500"
              }`}
            >
              Ảnh & Banner
            </button>

            <button
              type="button"
              onClick={() => setMainTab("library")}
              className={`border-b-2 px-1 py-3 text-sm font-semibold ${
                mainTab === "library"
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500"
              }`}
            >
              Thư viện ấn phẩm
            </button>
          </div>

       
<div
  className={`min-h-0 flex-1 gap-2 p-2 lg:p-3 ${
    mainTab === "scene"
      ? "grid grid-rows-[auto_minmax(0,1fr)_auto_auto] overflow-hidden"
      : "flex flex-col overflow-y-auto"
  }`}
>


            {mainTab === "scene" && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-amber-700">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Chưa có bản phối cảnh AI
                  </div>

                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
                    {[
                      { value: "original", label: "Ảnh gốc" },
                      { value: "mockup", label: "Phối cảnh" },
                      { value: "compare", label: "So sánh" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setViewMode(item.value as ViewMode)}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                          viewMode === item.value
                            ? "bg-[#1755A1] text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[#E6EBF2]">

                  {viewMode === "original" && selectedPhoto && (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden">
                      <img
                        src={selectedPhoto.url}
                        alt="Ảnh hiện trạng công trình"
                        className="max-h-full max-w-full object-contain transition-transform"
                        style={{ transform: `scale(${zoom / 100})` }}
                      />
                    </div>
                  )}

                  {viewMode === "original" && !selectedPhoto && (
                    <div className="mx-auto max-w-sm px-5 text-center">
                      <ImagePlus
                        size={52}
                        className="mx-auto mb-3 text-slate-400"
                      />
                      <h3 className="font-bold text-slate-700">
                        Chưa có ảnh hiện trạng
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Tải ảnh công trình lên để bắt đầu thiết kế.
                      </p>
                      <button
                        type="button"
                        onClick={() => uploadRef.current?.click()}
                        className="mt-4 rounded-lg bg-[#1755A1] px-4 py-2 text-sm font-semibold text-white"
                      >
                        <Upload size={15} className="mr-2 inline" />
                        Tải ảnh lên
                      </button>
                    </div>
                  )}

                  {viewMode === "mockup" && (
                    <div className="max-w-sm px-5 text-center">
                      <Sparkles
                        size={48}
                        className="mx-auto mb-4 text-blue-500"
                      />
                      <h3 className="font-bold text-slate-700">
                        Khu vực phối cảnh AI
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Bản phối cảnh sẽ hiển thị tại đây sau khi tích hợp
                        và xử lý yêu cầu bằng dịch vụ AI.
                      </p>
                      <span className="mt-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Chưa kết nối dịch vụ tạo ảnh
                      </span>
                    </div>
                  )}

                  {viewMode === "compare" && (
                    <div className="grid w-full grid-cols-1 gap-3 p-3 md:grid-cols-2">
                      <div className="flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-white">
                        <span className="mb-2 text-xs font-semibold text-slate-500">
                          ẢNH HIỆN TRẠNG
                        </span>
                        {selectedPhoto ? (
                          <img
                            src={selectedPhoto.url}
                            alt="Ảnh hiện trạng"
                            className="max-h-[360px] max-w-full object-contain"
                          />
                        ) : (
                          <ImageIcon className="text-slate-300" size={42} />
                        )}
                      </div>

                      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-blue-300 bg-white p-4 text-center">
                        <span className="mb-3 text-xs font-semibold text-slate-500">
                          BẢN PHỐI CẢNH AI
                        </span>
                        <Sparkles size={38} className="text-blue-400" />
                        <p className="mt-3 text-sm text-slate-500">
                          Chưa có kết quả để so sánh.
                        </p>
                      </div>
                    </div>
                  )}

                  {mainTab === "scene" && (
                    <div className="absolute right-3 top-3 flex gap-1 rounded-lg border border-slate-200 bg-white/95 p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setNotice("Công cụ chọn vùng sẽ được phát triển ở bước tiếp theo.")}
                        className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
                        title="Chọn vùng"
                      >
                        <Crop size={17} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoom(100)}
                        className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
                        title="Đặt lại chế độ xem"
                      >
                        <Maximize2 size={17} />
                      </button>
                    </div>
                  )}

                  {mainTab === "scene" && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setZoom((value) => Math.max(50, value - 10))}
                        className="p-1 text-slate-600 hover:text-blue-700"
                        title="Thu nhỏ"
                      >
                        <ZoomOut size={17} />
                      </button>
                      <span className="min-w-12 text-center text-xs font-semibold">
                        {zoom}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setZoom((value) => Math.min(150, value + 10))}
                        className="p-1 text-slate-600 hover:text-blue-700"
                        title="Phóng to"
                      >
                        <ZoomIn size={17} />
                      </button>
                    </div>
                  )}
                </div>

                {/* VERSIONS */}

{/* VERSIONS */}
<section className="shrink-0 rounded-lg border border-slate-200 bg-white p-2">
  <div className="mb-2 flex items-center justify-between gap-2">
    <h3 className="shrink-0 text-xs font-bold">
      Phiên bản
    </h3>
    <span className="truncate text-[10px] text-slate-400">
      Giữ lại ảnh gốc khi tạo phiên bản mới
    </span>
  </div>

  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => setViewMode("original")}
      className="flex w-32 items-center gap-2 rounded-md border-2 border-blue-600 bg-white p-1 text-left"
    >
      <div className="flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-slate-100">
        {selectedPhoto ? (
          <img
            src={selectedPhoto.url}
            alt="Ảnh hiện trạng"
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageIcon size={20} className="text-slate-300" />
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-[10px] font-semibold">
          Ảnh hiện trạng
        </p>
        <p className="text-[9px] text-slate-400">
          Bản gốc
        </p>
      </div>
    </button>

    <div className="flex h-[52px] w-32 shrink-0 items-center justify-center gap-1 rounded-md border border-dashed border-slate-300 px-2 text-center text-slate-400">
      <Sparkles size={16} />
      <span className="text-[10px]">
        Chưa có bản nháp AI
      </span>
    </div>
  </div>
</section>

              </>
            )}

            {mainTab === "banner" && (
              <div className="flex min-h-[400px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center">
                <div className="max-w-sm">
                  <FileImagePlaceholder />
                  <h3 className="mt-4 font-bold">Thiết kế ảnh & Banner</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Khu vực thiết kế banner theo kích thước, tỷ lệ và nội dung
                    yêu cầu sẽ được phát triển tại đây.
                  </p>
                  <span className="mt-4 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">
                    Chưa kết nối dịch vụ tạo ảnh
                  </span>
                </div>
              </div>
            )}

            {mainTab === "library" && (
              <div className="flex min-h-[400px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center">
                <div className="max-w-sm">
                  <Layers size={48} className="mx-auto text-blue-400" />
                  <h3 className="mt-4 font-bold">Thư viện ấn phẩm</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Các bản thiết kế đã hoàn thiện sẽ được lưu trữ và quản lý
                    tại khu vực này khi tích hợp hệ thống lưu trữ.
                  </p>
                </div>
              </div>
            )}


{/* FOOTER METRICS */}
<div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-500">
  <div className="flex items-center gap-1.5">
    <Clock3 size={14} />
    <span>Thời gian:</span>
    <strong>Chưa có dữ liệu</strong>
  </div>

  <div className="flex items-center gap-1.5">
    <Layers size={14} />
    <span>Token:</span>
    <strong>Chưa có dữ liệu</strong>
  </div>

  <div className="flex items-center gap-1.5">
    <Monitor size={14} />
    <span>Chi phí:</span>
    <strong>Chưa có dữ liệu</strong>
  </div>

  <span className="hidden italic text-slate-400 lg:inline">
    Chỉ hiển thị số liệu thực tế khi tích hợp AI
  </span>
</div>
</div>
</main>
        {/* RIGHT PANEL */}
        <aside className="flex w-full shrink-0 flex-col border-t border-slate-200 bg-white xl:w-[300px] xl:min-h-0 xl:overflow-y-auto xl:border-l xl:border-t-0">

          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <Sparkles size={22} className="text-blue-600" />
              <div>
                <h2 className="font-bold">Yêu cầu thiết kế</h2>
                <p className="text-xs text-slate-500">
                  Mô tả theo cách của bạn
                </p>
              </div>
            </div>

            <div className="mt-4 flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setSideTab("request")}
                className={`flex-1 border-b-2 pb-3 text-sm font-semibold ${
                  sideTab === "request"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500"
                }`}
              >
                Yêu cầu
              </button>

              <button
                type="button"
                onClick={() => setSideTab("specs")}
                className={`flex-1 border-b-2 pb-3 text-sm font-semibold ${
                  sideTab === "specs"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500"
                }`}
              >
                Thông số
              </button>
            </div>
          </div>

          {sideTab === "request" && (
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
                  <Sparkles size={16} />
                  Hướng dẫn thiết kế
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Mô tả vị trí lắp đặt, kích thước, nội dung hiển thị và phong
                  cách mong muốn. Bạn có thể gửi yêu cầu điều chỉnh ngay bên dưới.
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[92%] rounded-xl p-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "bg-[#1755A1] text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-200 p-3">
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Nhập yêu cầu điều chỉnh..."
                  rows={4}
                  className="w-full resize-none text-sm outline-none placeholder:text-slate-400"
                />

                <div className="mt-2 flex justify-between border-t border-slate-100 pt-2">
                  <span className="text-xs text-slate-400">
                    Yêu cầu thiết kế
                  </span>
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="rounded-lg bg-[#1755A1] p-2 text-white hover:bg-blue-800"
                    title="Gửi yêu cầu"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateDraft}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1755A1] px-4 py-3 text-sm font-bold text-white hover:bg-blue-800"
              >
                <Sparkles size={18} />
                Tạo lại bản nháp
              </button>

              <p className="text-center text-[11px] text-slate-400">
                Giao diện đề xuất · Chưa kết nối AI
              </p>
            </div>
          )}

          {sideTab === "specs" && (
            <div className="space-y-4 p-4">

              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <Monitor size={18} className="text-blue-600" />
                  Thiết bị lắp đặt
                </div>

                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Loại sản phẩm
                </label>
                <select
                  value={productType}
                  onChange={(event) => setProductType(event.target.value)}
                  className="mb-3 w-full rounded-lg border border-slate-200 p-2 text-sm"
                >
                  <option>LED trong nhà</option>
                  <option>LED ngoài trời</option>
                  <option>LED cong</option>
                  <option>LED Mesh</option>
                  <option>LED GOB</option>
                  <option>LED COB</option>
                  <option>LCD</option>
                  <option>Banner quảng cáo</option>
                  <option>Khác</option>
                </select>

                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Môi trường
                </label>
                <select
                  value={environment}
                  onChange={(event) => setEnvironment(event.target.value)}
                  className="mb-3 w-full rounded-lg border border-slate-200 p-2 text-sm"
                >
                  <option>Indoor</option>
                  <option>Outdoor</option>
                </select>

                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Pixel Pitch
                </label>
                <select
                  value={pixelPitch}
                  onChange={(event) => setPixelPitch(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm"
                >
                  {["P1.5", "P1.6", "P1.8", "P2", "P2.5", "P3", "P4", "P5", "P6", "P8", "P10"].map(
                    (pitch) => (
                      <option key={pitch}>{pitch}</option>
                    )
                  )}
                </select>
              </div>

              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <SlidersHorizontal size={18} className="text-blue-600" />
                  Kích thước & vị trí
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                      Chiều rộng (m)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={width}
                      onChange={(event) => setWidth(event.target.value)}
                      placeholder="Ví dụ: 4.80"
                      className="w-full rounded-lg border border-slate-200 p-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                      Chiều cao (m)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={height}
                      onChange={(event) => setHeight(event.target.value)}
                      placeholder="Ví dụ: 2.70"
                      className="w-full rounded-lg border border-slate-200 p-2 text-sm"
                    />
                  </div>
                </div>

                <label className="mb-1 mt-3 block text-xs font-medium text-slate-600">
                  Phương thức lắp đặt
                </label>
                <select
                  value={installation}
                  onChange={(event) => setInstallation(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm"
                >
                  <option>Gắn tường</option>
                  <option>Khung treo</option>
                  <option>Khung độc lập</option>
                  <option>Lắp trên cột</option>
                  <option>Khác</option>
                </select>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-800">
                <strong>Lưu ý:</strong> Thông số hiện được nhập và giữ trong
                phiên làm việc trên trình duyệt. Chưa lưu vào Database và
                chưa gửi tới dịch vụ AI.
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function FileImagePlaceholder() {
  return (
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
      <ImagePlus size={32} />
    </div>
  );
}
