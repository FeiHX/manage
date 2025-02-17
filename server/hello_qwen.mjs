import OpenAI from "openai";

const openai = new OpenAI(
    {
        // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
        apiKey: "sk-1b88676a2e40494ebe9014c8531289f5",
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
);
const completion = await openai.chat.completions.create({
    model: "deepseek-r1",  // 此处以 deepseek-r1 为例，可按需更换模型名称。
    messages: [
        { role: "user", 
        content: 'jest测试时使用msw模拟组件中的axios.all，然后通过在测试文件中使用render渲染组件，为什么显示获取不到数据'
 }
    ],
});
console.log("思考过程：")
console.log(completion.choices[0].message.reasoning_content)
console.log("最终答案：")
console.log(completion.choices[0].message.content)