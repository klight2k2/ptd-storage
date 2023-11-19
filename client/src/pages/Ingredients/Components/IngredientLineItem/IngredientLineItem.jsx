import React from "react";

import "./IngredientLineItem.scss";
import { Typography } from "antd";
import { formatDate, formatDateNew } from "../../../../utils/timeUtil";
import DetailDialog from "../DetailDialog/DetailDialog";

const IngredientLineItem = (props) => {
  const { ingredient } = props;
  const { Text, Link } = Typography;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div
        className="ingredientLineItem"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="lineItemImage"></div>
        <div className="detailLineItem">
          <Text style={{ fontSize: "24px", fontWeight: 700 }}>
            {ingredient.ingredient && ingredient.ingredient.ingredient_name
              ? ingredient.ingredient.ingredient_name
              : "---"}
          </Text>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "16px",
              fontSize: 16,
            }}
          >
            <Text style={{ marginRight: "32px", fontSize: 16 }}>
              Ngày hết hạn:{" "}
              {ingredient ? formatDateNew(ingredient.import_exp) : "---"}
            </Text>
            <Text style={{ fontSize: 16, marginLeft: 120 }}>
              Khối lượng: {ingredient.remain_amount}{" "}
              {ingredient.ingredient && ingredient.ingredient.ingredient_unit
                ? ingredient.ingredient.ingredient_unit
                : ""}
            </Text>
          </div>
          <Text style={{ fontSize: 16, marginTop: 32 }}>
            Ghi chú:{" "}
            {ingredient && ingredient.note
              ? ingredient.note
              : "Không có ghi chú"}
          </Text>
        </div>
      </div>
      <DetailDialog ingredient={ingredient} open={open} handleCancel={() => setOpen(false)}/>
    </>
  );
};

export default IngredientLineItem;
