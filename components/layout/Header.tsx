'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_ITEMS } from '@/config/navigation';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSubKey, setOpenSubKey] = useState<string | null>(null);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <nav className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/zhu.png"
            alt="Site logo"
            width={28}
            height={28}
            className="rounded-full border border-sky-200 bg-white object-cover"
            priority
          />
          <span className="text-base font-semibold tracking-tight">
            My Personal Site
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.filter((i) => i.enabled !== false).map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <div key={item.key} className="relative group">
                <Link
                  href={item.href}
                  className={`text-sm font-medium pb-1 ${
                    isActive(item.href, item.exact)
                      ? 'text-sky-600 border-b-2 border-sky-500'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
                {hasChildren && (
                  <div className="invisible absolute left-0 mt-2 min-w-[160px] rounded-md border bg-white py-2 text-sm shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    {item.children!.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className={`block px-3 py-1.5 ${
                          isActive(child.href)
                            ? 'bg-sky-50 text-sky-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="inline-flex items-center rounded-md border px-2 py-1 text-sm md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="切换菜单"
        >
          <span className="mr-1">菜单</span>
          <span className="h-0.5 w-4 bg-slate-700" />
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-2">
            {NAV_ITEMS.filter((i) => i.enabled !== false).map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isSubOpen = openSubKey === item.key;

              return (
                <div key={item.key} className="border-b last:border-b-0">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      href={item.href}
                      className={`text-sm ${
                        isActive(item.href, item.exact)
                          ? 'text-sky-600'
                          : 'text-slate-600'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        className="ml-2 text-xs text-slate-500"
                        onClick={() =>
                          setOpenSubKey(isSubOpen ? null : item.key)
                        }
                      >
                        {isSubOpen ? '收起' : '展开'}
                      </button>
                    )}
                  </div>
                  {hasChildren && isSubOpen && (
                    <div className="pb-2 pl-3">
                      {item.children!.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href}
                          className={`block py-1 text-xs ${
                            isActive(child.href)
                              ? 'text-sky-600'
                              : 'text-slate-500'
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

