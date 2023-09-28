import { ReactNode } from "react";
import { Equal, Expect } from "../helpers/type-utils";

interface TableProps<TRow> {
  rows: TRow[];
  renderRow: (row: TRow) => ReactNode;
}

/**
 * 1. Here, we have a table component. It takes an array of data and a function
 * to render each row. The problem is that the type of the data is not
 * generic. It's just `any`. We want to make it generic so that the type of
 * the data is inferred from the `rows` prop.
 */

//you can treat Table like any ol' function, but... a tsx file
//expects anything surrounded by angle brackets to be JSX
//and the accepted way to escape that is to shove a comma in like this:
export const Table = <TRow,>(props: TableProps<TRow>) => {
  return (
    <table>
      <tbody>
        {props.rows.map((row) => (
          <tr>{props.renderRow(row)}</tr>
        ))}
      </tbody>
    </table>
  );
};

//this means that Table is now a **generic component** - it can work correctly
//by inferring its data type from the props it receives

const data = [
  {
    id: 1,
    name: "John",
  },
];

export const Parent = () => {
  return (
    <div>
      <Table rows={data} renderRow={(row) => <td>{row.name}</td>} />
      <Table
        rows={data}
        renderRow={(row) => {
          type test = Expect<Equal<typeof row, { id: number; name: string; }>>;
          return (
            <td>
              {
                // @ts-expect-error
                row.doesNotExist
              }
            </td>
          );
        }}
      ></Table>
    </div>
  );
};
