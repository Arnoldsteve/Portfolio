export const Footer = () => {
  return (
    <footer className="bg-cyan-500/10 border-t border-cyan-500/20 py-4">
      <div className="container mx-auto text-center text-gray-600">
        <p>Copyright © {new Date().getFullYear()} by Steve Arnold | All Rights Reserved.</p>
      </div>
    </footer>
  );
};