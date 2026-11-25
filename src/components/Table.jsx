import "./Table.css";
import { Pencil, Trash2, Power } from "lucide-react";

function Table({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onToggleStatus,
  getDeleteError
}) {
  const showActions = onEdit || onDelete || onToggleStatus;

  function handleDelete(item) {
    const error = getDeleteError ? getDeleteError(item) : null;

    if (error) {
      alert(error);
      return;
    }

    const label = item.name ? `"${item.name}"` : "cet élément";

    if (window.confirm(`Voulez-vous vraiment supprimer ${label} ?`)) {
      onDelete(item.id);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
          {showActions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render ? column.render(item) : item[column.key]}
              </td>
            ))}

            {showActions && (
              <td>
                {onEdit && (
                  <button onClick={() => onEdit(item)} title="Modifier">
                    <Pencil size={18} />
                  </button>
                )}

                {onToggleStatus && (
                  <button
                    onClick={() => onToggleStatus(item.id)}
                    title={item.status === "Inactif" ? "Activer" : "Désactiver"}
                  >
                    <Power size={18} />
                  </button>
                )}

                {onDelete && (
                  <button onClick={() => handleDelete(item)} title="Supprimer">
                    <Trash2 size={18} />
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;