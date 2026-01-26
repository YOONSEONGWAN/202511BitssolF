function Header() {
    return (
        <div className="d-flex justify-content-between align-items-center px-3 py-2">
            <div className="fw-semibold">Bissol</div>
            <img
                src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='100%25' height='100%25' fill='%23e9ecef'/></svg>"
                alt="User profile"
                className="rounded-circle"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
        </div>
    )
}

export default Header
