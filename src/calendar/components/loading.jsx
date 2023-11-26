export const Loading = ({height = 0}) => {
  return (
    <div style={{ minHeight: `calc(100vh - ${height}px)`, backgroundColor: height > 0 ? '#fff' : '#222' }} className="d-flex justify-content-center align-items-center">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
