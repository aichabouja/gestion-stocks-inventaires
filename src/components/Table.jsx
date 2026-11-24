import "./Table.css";
import { Pencil, Trash2 } from "lucide-react";

function Table({ data = [], columns = [], onEdit, onDelete }) {
  const showActions = onEdit || onDelete;

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
              <td key={column.key}>{item[column.key]}</td>
            ))}

            {showActions && (
              <td>
                {onEdit && (
                  <button onClick={() => onEdit(item)}>
                    <Pencil size={18} />
                  </button>
                )}

                {onDelete && (
                  <button onClick={() => onDelete(item.id)}>
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