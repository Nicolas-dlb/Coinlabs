import "./Changelog.scss";

function Changelog() {
  return (
    <div id="changelog" className="changelog">
      <div className="upcoming_changes">
        <p className="page-title">v1.1 Upcoming change</p>
        <div className="change_container">
          <p className="added" />
          <p>More cryptocurrencies</p>
        </div>
        <div className="change_container">
          <p className="added" />
          <p>Day theme</p>
        </div>

        <div className="change_container">
          <p className="updated" />
          <p>Show password on login page</p>
        </div>
        <div className="change_container">
          <p className="fixed" />
          <p>Improve app load time</p>
        </div>
        <div className="change_container">
          <p className="fixed" />
          <p>Prevent app to keep log when exit</p>
        </div>
        <div className="title">Dev Notes</div>
        <div className="note_container">
          <div className="point" />
          <p className="added" />
          <p>CI/CD integration</p>
        </div>
        <div className="note_container">
          <div className="point" />
          <p className="added" />
          <p>Update changelog automaticaly</p>
        </div>
        <div className="note_container">
          <div className="point" />
          <p className="added" />
          <p>Incrase Tests number</p>
        </div>
        <div className="note_container">
          <div className="point" />
          <p className="updated" />
          <p>New Eslint configuration file</p>
        </div>
      </div>
    </div>
  );
}

export default Changelog;
