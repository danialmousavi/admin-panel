import ProductTable from "./ProductTable";
import SaleChart from "./SaleChart";
import Cards from "./Cards";

export default function Dashboard() {

  
  return (
    <div className="row">

      <Cards/>
      <div className="row">
        <ProductTable/>

        <SaleChart/>
      </div>
    </div>
  );
}