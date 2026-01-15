import { Button } from "@csc-react-components/components";

const ButtonDemo = () => {
  return (
    <div className="button-demo">
      <h2 className="text-2xl font-bold py-4">Button 组件示例</h2>
      <div className="text-lg font-bold py-4 ">按钮类型</div>
      <div className="flex gap-4 ">
        <Button
          variant="primary"
          size="medium"
          onClick={() => alert("primary")}
        >
          Click me
        </Button>
        <Button variant="default" size="medium">
          Click me
        </Button>
        <Button variant="danger" size="medium">
          Click me
        </Button>
      </div>
      <div className="text-lg font-bold  py-4">按钮尺寸</div>
      <div className="flex gap-4 items-center ">
        <Button variant="primary" size="small">
          Click me
        </Button>
        <Button variant="default" size="medium">
          Click me
        </Button>
        <Button variant="default" size="large">
          Click me
        </Button>
      </div>
    </div>
  );
};

export default ButtonDemo;
