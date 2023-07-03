function Footer() {
  function setDate() {
    const res = new Date().getFullYear();
    return res;
  }
  return (
    <footer className="footer">
      <div className = "footer__copyright">© {setDate()} Mesto Russia</div>
    </footer>
  );
}
export default Footer;
