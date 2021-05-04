import { useUserData } from "../../hooks";

export const SaveButton = ({ id }) => {
  const { isSaved, toggleSaved } = useUserData();

  return (
    <div style={{ position: "relative" }}>
    <button 
      data-tooltip={isSaved(id) ? "Remove" : "Save"}
    className="btn-icons" onClick={() => toggleSaved(id)}>
      <div
        className="icon"
        style={{
          color: isSaved(id) ? "red" : "white"
        }}
      >
        <i className="fa fa-bookmark"></i>
      </div>
    </button>
    </div>
  );
};