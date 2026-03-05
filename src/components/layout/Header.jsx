import { Bell, Search, HelpCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 bg-eqms-darker/80 backdrop-blur-sm border-b border-eqms-border flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-20">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-eqms-text-muted" />
          <input
            type="text"
            placeholder="Search documents, CAPAs, deviations..."
            className="w-full bg-eqms-card border border-eqms-border rounded-lg pl-9 pr-4 py-2 text-sm text-eqms-text placeholder:text-eqms-text-muted focus:outline-none focus:border-eqms-accent/50 focus:ring-1 focus:ring-eqms-accent/20"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg hover:bg-eqms-card text-eqms-text-dim hover:text-eqms-text transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-eqms-danger rounded-full" />
        </button>
        <button className="p-2 rounded-lg hover:bg-eqms-card text-eqms-text-dim hover:text-eqms-text transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
