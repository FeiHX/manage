import React, { forwardRef ,useEffect,useState} from 'react'
import {Form,Input, Select} from 'antd'
import { connect } from 'react-redux'
const {Option} = Select

 const UserForm1 = (props) => {
  const [isDisabled,setisDisabled] = useState(false)
  //监听props，只有当真正改变的时候，才选择调整是否禁用区域选项，
  //如果只是改变了角色，区域禁用实时更新，但之后点取消了，禁用选项也要回调
  
  useEffect(()=>{
    setisDisabled(props.isUpdateDisabled)
    
  },[props])

  //确定当前登录用户的区域选择选项，添加用户和更新里的表单共用了UserForm组件，所以要区分开,isUpdate={true}为更新
  // const {roleId,region} = JSON.parse(localStorage.getItem('token'))
  const {roleId,region} = props;
  const roleObj = {
    '1':'superadmin',
    '2':'admin',
    '3':'editor'
  }
  const checkRegionDisabled = (item)=> {
    // console.log(props.isUpdate,roleObj[roleId],item.value,region);
    if(props.isUpdate){
        if(roleObj[roleId]==='superadmin'){
          return false
        }else{
          return true
        }
    }else{
      if(roleObj[roleId]==='superadmin'){
        return false
      }else{
        return item.value!==region
      }
    }
  }

    //确定当前登录用户的角色选择选项，添加用户和更新里的表单共用了UserForm组件，所以要区分开,isUpdate={true}为更新
   
    const checkRoleDisabled = (item)=> {
      // console.log(props.isUpdate,roleObj[roleId],roleObj[item.id]);
      if(props.isUpdate){
          if(roleObj[roleId]==='superadmin'){
            return false
          }else{
            return true
          }
      }else{
        if(roleObj[roleId]==='superadmin'){
          return false
        }else{
          return roleObj[item.id]!=='editor'
        }
      }
    }
  return (

   
 <Form ref={props.refInstance}
        
        layout="vertical"
      >
        
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码名"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={isDisabled?[]:[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          
          <Select disabled={isDisabled}>
            {
              
              props.regionList.map(item=>
                <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.title}</Option>
              )
            }
          </Select>        
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select onChange={(value)=>{
            if(value === 1) {
              setisDisabled(true)
              ref.current.setFieldsValue({
                region:'全球'
              })
            }else{
              setisDisabled(false)
            }
           
          }}>
            {
              props.roleList?.map(item=>
                <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>
              )
            }
          </Select>
        </Form.Item>
       
      </Form>
   
  )
})
const mapStateToProps = ({RolesReducer:{roles},setCurrentUserReducer:{roleId,region,username,}}) => {

  return {
    roles,roleId,region,username
  }
}
const UserForm = connect(mapStateToProps)(UserForm1)
export default React.forwardRef((props,ref)=><UserForm {...props} refInstance={ref}></UserForm>)