import { IBM_Plex_Sans } from 'next/font/google';

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function WorkspaceFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body { margin: 0; padding: 0; overflow: hidden; background: #0f1115; }
      `}</style>
      <div className={ibmPlex.className} style={{ fontFamily: ibmPlex.style.fontFamily }}>
        {children}
      </div>
    </>
  );
}
