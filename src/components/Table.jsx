
import "./Table.css";
import { Pencil, Trash2 } from "lucide-react";

function Table({ data = [], columns = [], onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key}>{item[column.key]}</td>
            ))}

            <td>
              <button onClick={() => onEdit(item)}>
                <Pencil size={18} />
              </button>

              <button onClick={() => onDelete(item.id)}>
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
