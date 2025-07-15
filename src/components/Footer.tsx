const Footer = () => {
    return (
        <footer style={{
            padding: '1rem',
            textAlign: 'center',
            borderTop: '1px solid #ddd',
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: '#666'
        }}>
            <p>
                &copy; {new Date().getFullYear()} Matthew McGarry, All rights reserved.
            </p>
            <p>
                Licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>
            </p>
            <p>
                Built with ❤️ using <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and open-source tools.
            </p>
        </footer>
    );
};

export default Footer;