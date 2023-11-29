import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const { pid, title } = useParams();

  return (
    <div>
      <div>DetailProduct</div>
    </div>
  );
};

export default DetailProduct;
