'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Info,
  Layers,
  Send,
  UserPlus,
  Users,
} from 'lucide-react';
import { useSession } from '@/core/session/SessionContext';

const DEMO_PERIODS = ['7 ngày', '30 ngày', 'Tất cả'] as const;
type DemoPeriod = (typeof DEMO_PERIODS)[number];

const DEMO_KPI_BY_PERIOD: Record<
  DemoPeriod,
  {
    total: number;
    newLeads: number;
    quoteSent: number;
    won: number;
    waitingReply: number;
    winRate: string;
  }
> = {
  '7 ngày': {
    total: 6,
    newLeads: 2,
    quoteSent: 1,
    won: 1,
    waitingReply: 1,
    winRate: '17% tỷ lệ chốt',
  },
  '30 ngày': {
    total: 24,
    newLeads: 7,
    quoteSent: 6,
    won: 5,
    waitingReply: 3,
    winRate: '21% tỷ lệ chốt',
  },
  'Tất cả': {
    total: 48,
    newLeads: 11,
    quoteSent: 14,
    won: 12,
    waitingReply: 4,
    winRate: '25% tỷ lệ chốt',
  },
};

export default function DashboardPage() {
  const { user, branding } = useSession();
  const [period, setPeriod] = useState<DemoPeriod>('7 ngày');
  const kpi = DEMO_KPI_BY_PERIOD[period];
  const banner = branding.dashboardBanner;

  const hasBannerContent =
    Boolean(banner.headline.trim()) ||
    Boolean(banner.description.trim()) ||
    (banner.showButton && Boolean(banner.buttonLabel.trim())) ||
    (banner.showImage && Boolean(banner.imageUrl));

  return (
    <div className="space-y-6">
      {/* Explicit Local Development Demo Notice */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl bg-brand-soft border border-brand-border text-xs text-slate-700">
        <span className="w-2 h-2 rounded-full bg-brand ring-4 ring-brand/15 shrink-0" />
        <strong className="font-bold text-brand uppercase tracking-wide">
          Chế độ phát triển · Dữ liệu minh họa
        </strong>
        <span className="text-slate-600">
          Các chỉ số dưới đây là dữ liệu minh họa phục vụ kiểm thử bố cục giao diện cục bộ,
          không phải số liệu kinh doanh thực tế và không chứa giá bán hay doanh thu.
        </span>
      </div>

      {/* Page Heading & Period Controls (No decorative "Không gian làm việc" eyebrow) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Tổng quan
          </h1>
          <p className="text-[13px] text-ink-muted mt-1">
            Điều phối công việc theo vai trò <strong>{user?.roleName}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-soft border border-brand-border text-[11px] font-bold text-brand">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Dữ liệu minh họa
          </span>

          <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200/90 shadow-sm">
            {DEMO_PERIODS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPeriod(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  period === item
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-slate-600 hover:text-ink'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <Link
            href="/leads"
            className="h-9 px-4 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Quản lý Lead</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Saved Dashboard Banner (Managed exclusively in Brand Settings by Admin; no edit button here) */}
      {hasBannerContent && (
        <section
          aria-label="Banner thông điệp hệ thống"
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#143B85] via-[#1E53A3] to-[#2B6CB8] text-white shadow-card border border-blue-900/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div
              className={`${
                banner.showImage && banner.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12'
              } p-6 sm:p-8 flex flex-col justify-center relative z-10`}
            >
              <p className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-sky-200 flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-sm bg-amber-400" />
                <span>{branding.organizationName} · HỆ THỐNG QUẢN TRỊ NỘI BỘ</span>
              </p>

              {banner.headline.trim() && (
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight break-words">
                  {banner.headline}
                </h2>
              )}

              {banner.description.trim() && (
                <p className="text-xs sm:text-[13px] text-sky-100/90 mt-2.5 max-w-2xl leading-relaxed break-words">
                  {banner.description}
                </p>
              )}

              {banner.showButton && banner.buttonLabel.trim() && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href={banner.buttonHref || '/leads'}
                    className="px-4 py-2.5 rounded-xl bg-white text-brand font-bold text-xs inline-flex items-center gap-2 shadow-sm hover:bg-sky-50 transition-colors"
                  >
                    <span>{banner.buttonLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {banner.showImage && banner.imageUrl && (
              <div className="hidden lg:block lg:col-span-5 relative min-h-[210px]">
                <img
                  src={banner.imageUrl}
                  alt={banner.imageAlt}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/brand/showroom-toan-trung.webp';
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E53A3] via-[#1E53A3]/45 to-transparent" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4 Semantic Colored KPI Cards */}
      <section aria-label="Chỉ số tổng quan minh họa">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1: Blue (Overview) */}
          <div className="relative rounded-2xl bg-gradient-to-br from-white via-white to-[#EFF5FF] border border-blue-200/70 p-5 shadow-card overflow-hidden">
            <div className="absolute top-0 left-5 right-16 h-[3px] rounded-b bg-gradient-to-r from-[#1553A2] to-sky-400" />
            <div className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-bold text-slate-700">Tổng Lead</span>
              <div className="w-10 h-10 rounded-xl bg-[#E6F0FF] text-[#1553A2] grid place-items-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <strong className="font-display text-3xl font-bold text-ink tabular-nums">
                {kpi.total}
              </strong>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/90 border border-blue-200 text-[#1553A2]">
                Dữ liệu minh họa
              </span>
            </div>
            <div className="mt-3.5 h-1.5 w-full rounded-full bg-blue-100/80 overflow-hidden">
              <div className="h-full w-full rounded-full bg-[#1553A2]" />
            </div>
            <p className="mt-2.5 text-xs text-slate-500">
              Kỳ lọc: {period} · Minh họa giao diện
            </p>
          </div>

          {/* Card 2: Violet (New/Pending) */}
          <div className="relative rounded-2xl bg-gradient-to-br from-white via-white to-[#F7F4FF] border border-violet-200/70 p-5 shadow-card overflow-hidden">
            <div className="absolute top-0 left-5 right-16 h-[3px] rounded-b bg-gradient-to-r from-[#7846FF] to-purple-300" />
            <div className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-bold text-slate-700">Lead mới tiếp nhận</span>
              <div className="w-10 h-10 rounded-xl bg-[#EFEAFF] text-[#7846FF] grid place-items-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <strong className="font-display text-3xl font-bold text-ink tabular-nums">
                {kpi.newLeads}
              </strong>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/90 border border-violet-200 text-[#7846FF]">
                Mới tiếp nhận
              </span>
            </div>
            <div className="mt-3.5 h-1.5 w-full rounded-full bg-violet-100/80 overflow-hidden">
              <div className="h-full w-2/5 rounded-full bg-[#7846FF]" />
            </div>
            <p className="mt-2.5 text-xs text-slate-500">
              Đang ở trạng thái Vừa nhận thông tin
            </p>
          </div>

          {/* Card 3: Pale Amber (Waiting/Action) */}
          <div className="relative rounded-2xl bg-gradient-to-br from-white via-white to-[#FFFBEB] border border-amber-200/80 p-5 shadow-card overflow-hidden">
            <div className="absolute top-0 left-5 right-16 h-[3px] rounded-b bg-gradient-to-r from-[#F59E0B] to-amber-300" />
            <div className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-bold text-slate-700">Đã gửi báo giá</span>
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] grid place-items-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <strong className="font-display text-3xl font-bold text-ink tabular-nums">
                {kpi.quoteSent}
              </strong>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#FFFBEB] border border-amber-300/80 text-amber-800">
                {kpi.waitingReply} chờ phản hồi
              </span>
            </div>
            <div className="mt-3.5 h-1.5 w-full rounded-full bg-amber-100/90 overflow-hidden">
              <div className="h-full w-1/4 rounded-full bg-[#F59E0B]" />
            </div>
            <p className="mt-2.5 text-xs text-slate-500">
              Theo dõi nhắc phản hồi báo giá (UC02)
            </p>
          </div>

          {/* Card 4: Emerald (Completed/Success) */}
          <div className="relative rounded-2xl bg-gradient-to-br from-white via-white to-[#F0FDF7] border border-emerald-200/80 p-5 shadow-card overflow-hidden">
            <div className="absolute top-0 left-5 right-16 h-[3px] rounded-b bg-gradient-to-r from-[#0BAF7C] to-emerald-300" />
            <div className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-bold text-slate-700">Chốt thành công</span>
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#0BAF7C] grid place-items-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <strong className="font-display text-3xl font-bold text-ink tabular-nums">
                {kpi.won}
              </strong>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F0FDF7] border border-emerald-300/80 text-[#0BAF7C]">
                {kpi.winRate}
              </span>
            </div>
            <div className="mt-3.5 h-1.5 w-full rounded-full bg-emerald-100/90 overflow-hidden">
              <div className="h-full w-1/5 rounded-full bg-[#0BAF7C]" />
            </div>
            <p className="mt-2.5 text-xs text-slate-500">
              Chỉ đếm số lượng hồ sơ, không tính doanh thu
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Chart & Product Category Layout (No sales prices) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 5 BA Pipeline Statuses Visual Bar */}
        <section className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-display text-base font-bold text-ink">
                Tiến độ 5 trạng thái Pipeline chuẩn BA
              </h2>
              <p className="text-xs text-ink-muted mt-0.5">
                Minh họa phân bổ trạng thái hồ sơ (không bao gồm giá bán hoặc dự toán)
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
              Dữ liệu minh họa
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {[
              { label: 'Vừa nhận thông tin (new_lead)', count: kpi.newLeads, pct: 35, color: 'bg-[#7846FF]' },
              { label: 'Đang soạn báo giá (quoting)', count: 1, pct: 20, color: 'bg-[#1553A2]' },
              { label: 'Đã gửi báo giá (quote_sent)', count: kpi.quoteSent, pct: 25, color: 'bg-[#F59E0B]' },
              { label: 'Chốt thành công (won)', count: kpi.won, pct: 20, color: 'bg-[#0BAF7C]' },
              { label: 'Thất bại có lý do (lost)', count: 1, pct: 15, color: 'bg-slate-400' },
            ].map((row) => (
              <div key={row.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{row.label}</span>
                  <strong className="font-mono text-ink">{row.count} hồ sơ</strong>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${row.color}`}
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: 3 Product Category Groups & Module Status */}
        <section className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-base font-bold text-ink">
                  Nhóm danh mục sản phẩm BA
                </h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  3 nhóm sản phẩm chuẩn theo tài liệu đặc tả
                </p>
              </div>
              <Layers className="w-4 h-4 text-brand" />
            </div>

            <div className="mt-4 space-y-3">
              {[
                {
                  name: '1. Màn hình LED',
                  items: 'Indoor, Outdoor, Cong, Lưới, GOB, COB, LCD, Khác',
                  tag: 'led_screen',
                },
                {
                  name: '2. Bảng điện tử',
                  items: 'Năng suất, Thể thao, Marathon, Shotlock, An toàn LĐ, Đồng hồ LED, Giá vàng...',
                  tag: 'electronic_board',
                },
                {
                  name: '3. Khác / Nhu cầu khác',
                  items: 'Hỏi sửa chữa, Thuê, Sản phẩm đặc biệt, Chưa cung cấp thông tin',
                  tag: 'other',
                },
              ].map((cat) => (
                <div
                  key={cat.tag}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70"
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-xs font-bold text-ink">{cat.name}</strong>
                    <code className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-brand">
                      {cat.tag}
                    </code>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{cat.items}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3.5 rounded-xl bg-brand-soft/70 border border-brand-border flex items-start gap-2.5 text-xs text-slate-700">
            <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <span>
              Dữ liệu thực tế sẽ được đồng bộ tự động sau khi Nhóm 1 (M01) và Nhóm 4 (M04) bàn
              giao API.
            </span>
          </div>
        </section>
      </div>

      {/* 5 Module Quick Entry Table */}
      <section className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-card">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-4 h-4 text-brand" />
            <h2 className="font-display text-sm font-bold text-ink">
              Trạng thái bàn giao 5 phân hệ nghiệp vụ
            </h2>
          </div>
          <span className="text-xs text-slate-400">Kiến trúc Monorepo 5 nhóm độc lập</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-200/80">
                <th className="py-3 px-5 font-bold">Mã</th>
                <th className="py-3 px-5 font-bold">Phân hệ</th>
                <th className="py-3 px-5 font-bold">Nhóm phụ trách</th>
                <th className="py-3 px-5 font-bold">Nhánh Git</th>
                <th className="py-3 px-5 font-bold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { code: 'M01', name: 'Quản lý Lead & Pipeline', owner: 'Nhóm 1 — Lâm Thành Nam', branch: 'feature/lead-management', href: '/leads' },
                { code: 'M02', name: 'Tracking & Đồng bộ đa kênh', owner: 'Nhóm 2 — Cát Cần Sỹ', branch: 'feature/tracking-integration', href: '/tracking' },
                { code: 'M03', name: 'Quảng cáo, Từ khóa & SEO', owner: 'Nhóm 3 — Nguyễn Anh Quân', branch: 'feature/ads-keywords', href: '/ads' },
                { code: 'M04', name: 'Dashboard & Báo cáo', owner: 'Nhóm 4 — Nguyễn Hoàng Minh Khôi', branch: 'feature/reports-dashboard', href: '/reports' },
                { code: 'M05', name: 'AI Hỗ trợ Thiết kế (GĐ 2)', owner: 'Nhóm 5 — Lý Tăng Hữu', branch: 'feature/ai-design', href: '/design' },
              ].map((m) => (
                <tr key={m.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-brand">{m.code}</td>
                  <td className="py-3.5 px-5 font-semibold text-ink">
                    <Link href={m.href} className="hover:text-brand hover:underline">
                      {m.name}
                    </Link>
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">{m.owner}</td>
                  <td className="py-3.5 px-5">
                    <code className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {m.branch}
                    </code>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Đang phát triển
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
