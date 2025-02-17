import React ,{useEffect, useState,useContext,useRef}from 'react'
import { Button, Table, Modal,Form,Input} from 'antd'
import Axios from '../../../utils/myAxios'
import {DeleteOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import { connect } from 'react-redux';
const { confirm } = Modal;

function NewsCategory(props) {
    const [dataSource,setdataSource] = useState([])
    useEffect(() => {
        Axios.get("/api/categories").then(res=>{
        setdataSource(res.data)
      })
    },[])
    const handleSave = (record) => {
        setdataSource(dataSource.map(item => {
            if(item.id === record.id) {
                return {
                    id:item.id,
                    title:record.title,
                    value:record.title
                }
            }
            return item
        }))
        Axios.patch(`/api/categories?id=${record.id}`, {
            title:record.title,
            value:record.title
        })
        props.changeCategories(dataSource.map(item => {
            if(item.id === record.id) {
                return {
                    id:item.id,
                    title:record.title,
                    value:record.title
                }
            }
            return item
        }))
      }
    const columns = [
          {
              title: 'ID',
              dataIndex: 'id',
              render: (id) => {
                  return <b>{id}</b>
              }
          },
          {
              title: '栏目名称',
              dataIndex: 'title',
              onCell: (record) => ({
                  record,
                  editable: true,
                  dataIndex: 'title',
                  title: '栏目名称',
                  handleSave,
              }),
          },
          {
              title: '操作',
              render:(item) => {
                  return <div>
                      <Button  danger shape='circle' icon={<DeleteOutlined/>}
                          onClick = {() => confirmMethod(item)}
                      ></Button>
                  </div>
              }
          },
      ];   
    const confirmMethod = (item) => {
        confirm({
            title: '你确定删除吗?',
            icon: <ExclamationCircleFilled />,
            onOk() { deleteMethod(item) },
            onCancel() { },
        });
    };
    const deleteMethod = (item) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        Axios.delete(`/api/categories?id=${item.id}`)
        props.changeCategories(dataSource.filter(data => data.id !== item.id))
    }
    const EditableContext = React.createContext(null);
    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
      };
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
        }) => {
            const [editing, setEditing] = useState(false);
            const inputRef = useRef(null);
            const form = useContext(EditableContext);
            useEffect(() => {
              if (editing) {
                inputRef.current.focus();
              }
            }, [editing]);
            const toggleEdit = () => {
                setEditing(!editing);
                form.setFieldsValue({[dataIndex]: record[dataIndex]});
            };
            const save = async () => {
                try{
                    const values = await form.validateFields();
                    toggleEdit();
                    handleSave({...record, ...values});
                }catch(errInfo) {
                    console.log('Save failed:', errInfo);
                }
            };
            let childNode = children;
            if(editable) {
                childNode = editing ? (
                    <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    rules={[{ required: true, message: `${title} is required.` }]}
                    >
                        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                    </Form.Item>
                ) : (
                    <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                        {children}
                    </div>
                );
            }
            return <td {...restProps}>{childNode}</td>;
        };
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize:5 }}
                rowKey={item=>item.id}
                components = {{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    }
                }}
            ></Table>
        </div>
    )
}
const mapDispatchToProps = {
    changeCategories(categories) {
        return {
            type:"change_categories",
            payload:categories
        }
    }
};
export default connect(null,mapDispatchToProps) (NewsCategory)
