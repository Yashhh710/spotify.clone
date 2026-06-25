function ErrorPage() {

  return (
    <>
      <div className="glitch-wrapper" aria-hidden="true">
        <span className="glitch-text">404</span>
      </div>

      <p className="subtitle">error / page not found</p>

      <h1 id="error-heading" className="headline">
        Lost in the void?
      </h1>

      <p className="description">
        The page you're looking for has vanished into thin air — or maybe it
        never existed. Either way, it's not here.
      </p>
    </>
  );
}
