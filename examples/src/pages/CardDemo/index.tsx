import { Card } from "@csc-react-components/components";

const CardDemo = () => {
  return (
    <div className="card-demo">
      <h2 className="text-2xl font-bold py-4">Card 组件示例</h2>

      <div className="text-lg font-bold py-4">基础卡片</div>
      <div className="flex gap-4 flex-wrap">
        <Card width={300}>基础卡片内容</Card>
        <Card width={300} summary="这是卡片的概要信息">
          带概要的卡片
        </Card>
      </div>

      <div className="text-lg font-bold py-4">带图片的卡片</div>
      <div className="flex gap-4 flex-wrap">
        <Card width={300} imgSrc="https://picsum.photos/300/200">
          带图片的卡片
        </Card>
        <Card
          width={300}
          imgSrc="https://picsum.photos/300/200"
          summary="带图片和概要的卡片"
        >
          卡片内容
        </Card>
      </div>

      <div className="text-lg font-bold py-4">自定义图片高度</div>
      <div className="flex gap-4 flex-wrap">
        <Card
          width={300}
          imgSrc="https://picsum.photos/300/150"
          imgHeight={150}
          summary="图片高度 150px"
        >
          自定义图片高度
        </Card>
        <Card
          width={300}
          imgSrc="https://picsum.photos/300/250"
          imgHeight={250}
          summary="图片高度 250px"
        >
          自定义图片高度
        </Card>
      </div>

      <div className="text-lg font-bold py-4">不同宽度的卡片</div>
      <div className="flex gap-4 flex-wrap">
        <Card
          width={200}
          imgSrc="https://picsum.photos/200/150"
          summary="宽度 200px"
        >
          小卡片
        </Card>
        <Card
          width={400}
          imgSrc="https://picsum.photos/400/250"
          summary="宽度 400px"
        >
          大卡片
        </Card>
      </div>

      <div className="text-lg font-bold py-4">ReactNode 类型的概要</div>
      <div className="flex gap-4 flex-wrap">
        <Card
          width={300}
          imgSrc="https://picsum.photos/300/200"
          summary={
            <div>
              <strong>自定义概要</strong>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "12px",
                  color: "#909399",
                }}
              >
                支持 ReactNode 类型
              </p>
            </div>
          }
        >
          卡片内容
        </Card>
      </div>
    </div>
  );
};

export default CardDemo;
