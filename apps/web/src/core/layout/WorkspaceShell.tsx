'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Bell,
  Crosshair,
  FileSpreadsheet,
  LayoutGrid,
  LogOut,
  Menu,
  Megaphone,
  Search,
  Settings,
  Sparkles,
  UserCircle2,
  Users,
  X,
} from 'lucide-react';
import { useSession } from '../session/SessionContext';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  adminOnly?: boolean;
}

const BREADCRUMB_LABELS: Record<string, string> = {
  '/dashboard': 'Tổng quan',
  '/leads': 'Quản lý Lead',
  '/tracking': 'Tracking & đồng bộ',
  '/ads': 'Quảng cáo & từ khóa',
  '/reports': 'Báo cáo',
  '/design': 'AI thiết kế',
  '/notifications': 'Thông báo',
  '/profile': 'Hồ sơ tài khoản',
  '/admin/users': 'Quản lý tài khoản',
  '/settings': 'Cài đặt thương hiệu',
};

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return 'TT';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/dashboard';
  const { user, loading, branding, unreadCount, logout } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const workNav: NavItem[] = [
    { href: '/dashboard', label: 'Tổng quan', icon: LayoutGrid },
    { href: '/leads', label: 'Quản lý Lead', icon: FileSpreadsheet },
    { href: '/tracking', label: 'Tracking & đồng bộ', icon: Crosshair },
    { href: '/ads', label: 'Quảng cáo & từ khóa', icon: Megaphone },
    { href: '/reports', label: 'Báo cáo', icon: BarChart3 },
    { href: '/design', label: 'AI thiết kế', icon: Sparkles },
  ];

  const personalNav: NavItem[] = [
    { href: '/notifications', label: 'Thông báo', icon: Bell, badge: unreadCount },
    { href: '/profile', label: 'Hồ sơ tài khoản', icon: UserCircle2 },
  ];

  const systemNav: NavItem[] = [
    { href: '/admin/users', label: 'Quản lý tài khoản', icon: Users, adminOnly: true },
    { href: '/settings', label: 'Cài đặt thương hiệu', icon: Settings },
  ];

  const currentBreadcrumb = BREADCRUMB_LABELS[pathname] || 'Tổng quan';

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl px-8 py-7 shadow-card flex items-center gap-4">
          <div className="w-5 h-5 rounded-full border-2 border-brand border-t-transparent animate-spin" />
          <div>
            <p className="text-sm font-semibold text-ink">Đang kiểm tra phiên đăng nhập...</p>
            <p className="text-xs text-ink-muted mt-0.5">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const visibleSystemNav = systemNav.filter(
    (item) => !item.adminOnly || user.roleCode === 'ADMIN',
  );

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="mb-6">
      <p className="px-3 mb-2 text-[10px] font-extrabold tracking-[0.11em] uppercase text-slate-400">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group relative flex items-center gap-3 h-11 rounded-xl px-3 text-[13px] transition-colors ${
                active
                  ? 'bg-brand-soft text-brand font-bold'
                  : 'text-slate-600 font-medium hover:bg-slate-100/80 hover:text-ink'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  active ? 'text-brand' : 'text-slate-400 group-hover:text-ink'
                }`}
              />
              <span className="truncate flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-lg bg-brand text-white text-[11px] font-bold">
                  {item.badge}
                </span>
              )}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-l bg-brand"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink flex w-full">
      {/* Mobile Scrim */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Đóng thanh điều hướng"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Sidebar — Always expanded on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 lg:sticky lg:top-0 lg:h-screen lg:w-[256px] w-[264px] bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <img
              src={branding.logo.url || '/brand/logo-toan-trung.png'}
              alt={branding.logo.altText}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/brand/logo-toan-trung.png';
              }}
              className="h-9 w-auto max-w-[172px] object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Đóng menu"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-5">
          {renderNavGroup('CÔNG VIỆC', workNav)}
          {renderNavGroup('CÁ NHÂN', personalNav)}
          {renderNavGroup('HỆ THỐNG', visibleSystemNav)}
        </nav>

        {/* Bottom Account Summary */}
        <div className="p-4 border-t border-slate-100">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-slate-50 transition-colors"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-brand-soft text-brand font-extrabold text-xs grid place-items-center shrink-0">
                {getInitials(user.fullName)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-ink truncate">{user.fullName}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.roleName}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar — Desktop collapse button removed, header content aligned neatly */}
        <header className="sticky top-0 z-20 h-[68px] bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 -ml-1 rounded-xl text-slate-500 hover:text-brand hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs — Keep only the current page name */}
            <nav aria-label="Breadcrumb" className="flex items-center min-w-0">
              <strong className="text-ink font-bold text-sm sm:text-[15px] truncate">
                {currentBreadcrumb}
              </strong>
            </nav>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Search bar */}
            <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-400 w-52">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Tìm nhanh phân hệ...</span>
              <kbd className="ml-auto text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </div>

            {/* Notification Bell */}
            <Link
              href="/notifications"
              aria-label="Thông báo"
              className="relative w-9 h-9 rounded-xl border border-slate-200/80 bg-white hover:bg-brand-soft hover:border-brand-border text-slate-600 hover:text-brand grid place-items-center transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-white text-[10px] font-bold grid place-items-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Profile Pill with Avatar & Full Name */}
            <Link
              href="/profile"
              title={`${user.fullName} (${user.email})`}
              className="flex items-center gap-2.5 h-9 pl-1.5 pr-3 rounded-full border border-slate-200/80 bg-white hover:border-brand-border transition-colors"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <span className="w-6 h-6 rounded-full bg-brand-soft text-brand font-bold text-[11px] grid place-items-center shrink-0">
                  {getInitials(user.fullName)}
                </span>
              )}
              <span className="hidden sm:inline text-xs font-semibold text-ink max-w-[140px] truncate">
                {user.fullName}
              </span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={() => void logout()}
              title="Đăng xuất"
              className="h-9 px-3 rounded-xl border border-slate-200/80 bg-white hover:bg-red-50 hover:border-red-200 text-slate-600 hover:text-red-600 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Đăng xuất</span>
            </button>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-7 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
