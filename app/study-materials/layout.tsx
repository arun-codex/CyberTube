import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bug Bounty Study Library | CyberTube',
  description: 'Premium security study materials – authenticated access only.',
};

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
