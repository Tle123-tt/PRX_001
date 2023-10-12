import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 47,
      }}
      spin
    />
  );

  return <>
    <div className="flex">
        <Spin indicator={antIcon}/>
        <div className="font-sans mx-8">Loading...</div>
    </div>
  </>;
};

export default Loading;
