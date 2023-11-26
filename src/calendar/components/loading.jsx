export const Loading = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#222' }} className="d-flex justify-content-center align-items-center">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
