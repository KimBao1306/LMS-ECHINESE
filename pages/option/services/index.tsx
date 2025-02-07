import React, { useEffect, useState } from "react";
import PowerTable from "~/components/PowerTable";
import FilterColumn from "~/components/Tables/FilterColumn";
import FilterDateColumn from "~/components/Tables/FilterDateColumn";
import SortBox from "~/components/Elements/SortBox";
import FilterTable from "~/components/Global/CourseList/FitlerTable";
import { data } from "../../../lib/option/dataOption2";
import { serviceApi } from "~/apiBase";
import { Tooltip, Switch } from "antd";
import ServiceForm from "~/components/Global/Option/ServiceForm";
import LayoutBase from "~/components/LayoutBase";
import { useWrap } from "~/context/wrap";
const ServiceList = () => {
  const [dataService, setDataService] = useState<IService[]>([]);
  const { showNoti } = useWrap();
  const [isLoading, setIsLoading] = useState({
    type: "",
    status: false,
  });
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    status: null,
  });
  const [dataHidden, setDataHidden] = useState({
    ListCourseId: null,
    Enable: null,
  });
  const [rowData, setRowData] = useState<IService[]>();

  const getDataService = () => {
    setIsLoading({
      type: "GET_ALL",
      status: true,
    });
    (async () => {
      try {
        let res = await serviceApi.getAll();
        res.status == 200 && setDataService(res.data.data);
      } catch (error) {
        showNoti("danger", error.message);
      } finally {
        setIsLoading({
          type: "GET_ALL",
          status: false,
        });
      }
    })();
  };

  const getDataServiceWithID = (ServiceID: number) => {
    setIsLoading({
      type: "GET_WITH_ID",
      status: true,
    });
    (async () => {
      try {
        let res = await serviceApi.getWitdhID(ServiceID);
        res.status == 200 && setRowData(res.data.data); 
      } catch (error) {
        showNoti("danger", error.message);
      } finally {
        setIsLoading({
          type: "GET_WITH_ID",
          status: false,
        });
      }
    })();
  };

  // ADD Data
  const _onSubmit = async (data: any) => {
    setIsLoading({
      type: "ADD_DATA",
      status: true,
    });

    let res = null;

    if(data.ID) {
      console.log(data);
      try {
        res = await serviceApi.put(data);
        res?.status == 200 && afterPost("Sửa");
      } catch (error) {
        showNoti("danger", error.message);
      } finally {
        setIsLoading({
          type: "ADD_DATA",
          status: false,
        });
      }
    } else {
      try {
        res = await serviceApi.post(data);
        res?.status == 200 && afterPost("Thêm");
      } catch (error) {
        showNoti("danger", error.message);
      } finally {
        setIsLoading({
          type: "ADD_DATA",
          status: false,
        });
      }
    }

    return res;
  }

  // DELETE COURSE
  const changeStatus = async (checked: boolean, idRow: number) => {
    console.log("Checked: ", checked);
    console.log("Branch ID: ", idRow);

    setIsLoading({
      type: "GET_ALL",
      status: true,
    });

    try {
      let res = await serviceApi.changeStatus(idRow);
      res.status == 200 && getDataService();
    } catch (error) {
      showNoti("danger", error.Message);
    } finally {
      setIsLoading({
        type: "GET_ALL",
        status: false,
      });
    }
  };

  const afterPost = (value) => {
    showNoti("success", `${value} thành công`);
    getDataService();
    // addDataSuccess(), setIsModalVisible(false);
  };

  const columns = [
    { title: "Service", dataIndex: "ServiceName", ...FilterColumn("ServiceName") },
    { title: "DescribeService", dataIndex: "DescribeService" },
    { title: "Modified By", dataIndex: "ModifiedBy", ...FilterColumn("ModifiedBy") },
    {
      title: "Modified Date",
      dataIndex: "ModifiedOn",
      ...FilterDateColumn("ModifiedOn"),
    },
    {
      title: "Hidden",
      dataIndex: "Enable",
      render: (Enable, record) => (
        <>
          <Switch
            checkedChildren="Show"
            unCheckedChildren="Hide"
            checked={Enable}
            size="default"
            onChange={(checked) => changeStatus(checked, record.ID)}
          />
        </>
      ),
    },
    {
      render: (record) => (
        <>
          <ServiceForm 
            ServiceID={record.ID}
            getDataServiceWithID={(ServiceID: number) => {
              getDataServiceWithID(ServiceID)
            }}
            rowData={rowData}
            isLoading={isLoading}
            showIcon={true} 
            _onSubmit={(data: any) => _onSubmit(data)}
            />
        </>
      ),
    },
  ];

  useEffect(() => {
    getDataService();
  }, []);

  return (
    <>
      <PowerTable
        loading={isLoading}
        addClass="basic-header"
        TitlePage="Services List"
        TitleCard={
          <ServiceForm 
          showAdd={true}
          addDataSuccess={() => getDataService()}
          isLoading={isLoading}
          _onSubmit={(data: any) => _onSubmit(data)}
          />}
        dataSource={dataService}
        columns={columns}
        Extra={
          <div className="extra-table">
            <FilterTable />
            <SortBox />
          </div>
        }
      />
    </>

  );
};
ServiceList.layout = LayoutBase;
export default ServiceList;
