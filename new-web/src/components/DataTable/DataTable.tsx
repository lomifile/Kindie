import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/lib/table";
import React, { useState } from "react";

/**
 * TODO: Check if type is definied from data that is pulled from API
 * and should be added to Columns type and instead of DataType use real types.
 */

interface DataType {
  Id: React.Key;
  Name: string;
  Surname: string;
  Gender: string;
  BirthDate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "Name",
    onFilter: (value, record) => record.Name.indexOf(value as string) === 0,
    sorter: (a, b) => a.Name.length - b.Name.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Last name",
    dataIndex: "Surname",
    sorter: (a, b) => a.Surname.length - b.Surname.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Gender",
    dataIndex: "Gender",
  },
  {
    title: "BirthDate",
    dataIndex: "BirthDate",
  },
];

interface DataTableProps {
  data?: DataType[];
}

const data = {
  children: [
    {
      Id: 37,
      Name: "Sherman",
      Surname: "Leirmonth",
      Gender: "Male",
      BirthDate: "2021-07-22T22:00:00.000Z",
      OIB: 2003,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 3,
      Name: "Cindra",
      Surname: "Moyser",
      Gender: "Female",
      BirthDate: "2022-05-04T22:00:00.000Z",
      OIB: 2007,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 4,
      Name: "Olag",
      Surname: "Edgar",
      Gender: "Male",
      BirthDate: "2022-04-26T22:00:00.000Z",
      OIB: 1993,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 5,
      Name: "Bertrando",
      Surname: "Densie",
      Gender: "Male",
      BirthDate: "2021-12-10T23:00:00.000Z",
      OIB: 1998,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 6,
      Name: "Alanah",
      Surname: "Fanti",
      Gender: "Female",
      BirthDate: "2022-06-25T22:00:00.000Z",
      OIB: 2000,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 7,
      Name: "Clarke",
      Surname: "Piotrkowski",
      Gender: "Non-binary",
      BirthDate: "2021-11-01T23:00:00.000Z",
      OIB: 1968,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 8,
      Name: "Culley",
      Surname: "Shillabeare",
      Gender: "Male",
      BirthDate: "2021-07-11T22:00:00.000Z",
      OIB: 2004,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 9,
      Name: "Giordano",
      Surname: "Lehrian",
      Gender: "Male",
      BirthDate: "2022-01-19T23:00:00.000Z",
      OIB: 2005,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 10,
      Name: "Jervis",
      Surname: "Gogin",
      Gender: "Male",
      BirthDate: "2022-02-12T23:00:00.000Z",
      OIB: 1997,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 11,
      Name: "Norbert",
      Surname: "Treadger",
      Gender: "Male",
      BirthDate: "2022-06-20T22:00:00.000Z",
      OIB: 1996,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 12,
      Name: "Massimo",
      Surname: "Vose",
      Gender: "Male",
      BirthDate: "2021-12-30T23:00:00.000Z",
      OIB: 2008,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 13,
      Name: "Murial",
      Surname: "Allgood",
      Gender: "Female",
      BirthDate: "2021-08-09T22:00:00.000Z",
      OIB: 1996,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 14,
      Name: "Hedwig",
      Surname: "Ainscow",
      Gender: "Female",
      BirthDate: "2022-04-30T22:00:00.000Z",
      OIB: 2003,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 15,
      Name: "Wolfy",
      Surname: "Pedrol",
      Gender: "Male",
      BirthDate: "2022-06-19T22:00:00.000Z",
      OIB: 2000,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 16,
      Name: "Tirrell",
      Surname: "Playhill",
      Gender: "Male",
      BirthDate: "2021-07-11T22:00:00.000Z",
      OIB: 2004,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 17,
      Name: "Cullan",
      Surname: "Atyea",
      Gender: "Bigender",
      BirthDate: "2022-03-20T23:00:00.000Z",
      OIB: 2003,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 18,
      Name: "Towny",
      Surname: "Lockhart",
      Gender: "Male",
      BirthDate: "2022-03-27T22:00:00.000Z",
      OIB: 1977,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 19,
      Name: "Kristofer",
      Surname: "Muat",
      Gender: "Male",
      BirthDate: "2021-09-19T22:00:00.000Z",
      OIB: 1994,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 20,
      Name: "Carlie",
      Surname: "Otridge",
      Gender: "Male",
      BirthDate: "2022-06-11T22:00:00.000Z",
      OIB: 1993,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
    {
      Id: 21,
      Name: "Bud",
      Surname: "Copcott",
      Gender: "Male",
      BirthDate: "2021-10-03T22:00:00.000Z",
      OIB: 2002,
      Remarks: "yjrtdythrdfjk",
      createdBy: null,
      updatedBy: null,
      mother: null,
      father: null,
      motherId: null,
      fatherId: null,
      createdAt: "2022-07-10T08:06:33.153Z",
      updatedAt: "2022-07-10T08:06:33.153Z",
    },
  ],
  hasMore: true,
};

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.Name === "Disabled User", // Column configuration not to be checked
    name: record.Name,
  }),
};

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const DataTable: React.FC<DataTableProps> = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          pageSize: variables.limit,
          onChange: () => {
            setVariables({
              limit: variables.limit,
              cursor: data.children[data.children.length - 1].createdAt,
            });
          },
        }}
        rowKey={(data) => data.Id}
        onChange={onChange}
        dataSource={data.children}
      />
    </div>
  );
};
