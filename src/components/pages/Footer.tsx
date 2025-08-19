export const Footer = () => {
  return (
    <footer className="bg-accent/20 border-t border-border/50 py-4">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>Copyright © {new Date().getFullYear()} by Steve Arnold | All Rights Reserved.</p>
      </div>
    </footer>
  );
};