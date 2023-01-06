import * as React from "react";
import { useSortableData } from "../../hooks/useSortableData";
import Button from "../Button";

type HeaderType = {
  name: string;
  property: string;
  sortable?: boolean;
};

interface TableDataProps<T> extends React.HTMLAttributes<HTMLElement> {
  data: T[] | null | undefined;
  header: HeaderType[];
  renderItem: (element: T) => React.ReactNode;
}

export const TableData = <T extends {}>({
  data,
  renderItem,
  header,
}: TableDataProps<T>) => {
  const { items, requestSort, sortConfig } = useSortableData<T>(data as T[]);
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    if (sortConfig.key === name) {
      switch (sortConfig.direction) {
        case "ascending":
          return (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          );
        case "descending":
          return (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          );
      }
    }
  };

  return (
    <>
      <thead className="border-b">
        <tr>
          {header.map((e, idx) => {
            if (e.sortable) {
              return (
                <th
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  key={idx}
                >
                  <Button
                    className="flex flex-row text-center"
                    onClick={() => requestSort(e.property)}
                  >
                    {e.name}
                    {getClassNamesFor(e.property)}
                  </Button>
                </th>
              );
            }
            return (
              <th
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                key={idx}
              >
                {e.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((e: T, idx) => (
          <tr className="border-b" key={idx}>
            {renderItem(e)}
          </tr>
        ))}
      </tbody>
    </>
  );
};
