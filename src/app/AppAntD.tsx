import React, {useCallback, useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC} from './app-reducer'
import {BrowserRouter, Redirect, Route, useHistory} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../features/Login/auth-reducer'
import TodolistItem from "../features/TodolistsList/TodolistItem";
import TaskItem from "../features/TodolistsList/Todolist/Task/TaskItem";
import {observer} from "mobx-react";
import { Link } from 'react-router-dom'
import {Breadcrumb, Button, Col, Layout, Menu, Row} from 'antd';
import {Footer} from 'antd/lib/layout/layout'
import 'antd/dist/antd.css';

const {Header, Content} = Layout;



const AppAntD = observer(() => {
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])


    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])



    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            {/*<CircularProgress/>*/}
        </div>
    }

    return (<div  style={{minHeight:'100vh',display:'flex', justifyContent:"center",alignItems:'center'}}>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Row>
                        <Col span={20}>
                            <Link to={'/'} style={{color:'white', margin:'0 20px'}}>Home</Link>

                        </Col>
                        <Col span={4}>
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                        </Col>
                    </Row>

                </Header>
                <Breadcrumb style={{ margin: '16px 16px' }} >
                    <Breadcrumb.Item><Link to={'/todolistItem/:todoId/taskItem/:taskId'} >Task</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/todolistItem/:todoId'} >Todolist</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={''} >Home</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{padding: '0 50px',minHeight:'80vh'}}>
                    <div className="site-layout-content">

                            <div className="App">
                                <ErrorSnackbar/>
                                <Route exact path={'/'} render={() => <TodolistsList/>}/>
                                <Route path={'/login'} render={() => <Login/>}/>
                                <Route exact path={'/todolistItem/:todoId'} render={() => <TodolistItem/>}/>
                                <Route exact path={'/todolistItem/:todoId/taskItem/:taskId'}
                                       render={() => <TaskItem/>}/>
                            </div>
                    </div>
                </Content>
                <Footer
                    style={{textAlign: 'center',}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </div>
    )
});

export default AppAntD
