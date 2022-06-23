import React, { Component } from "react";
import { getCategoryList} from '../../util/APIUtils';


import { Table, notification} from 'antd';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isLoading: false
        }
        this.loadCategoryList = this.loadCategoryList.bind(this)
    }

    loadCategoryList = async () => {

        this.setState({
            isLoading: true,
            categories: []
        });

        try {
            const response = await getCategoryList();
            this.setState({
                categories: response,
                isLoading: false
            })

        } catch (error) {
            notification.error({
                message: 'Article Classifier',
                description: error.message || 'Sorry! Something went wrong. Please try again!',
            }); 

            this.setState({
                isLoading: false
            });
        }
        

    }

    componentDidMount() {
        this.loadCategoryList();
      }

    render() {
        const { categories } = this.state;

        const colums = [
            {
                title: 'Category',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Main Category',
                dataIndex: 'main_category',
                key: 'main_category',
            }
        ]

        return (
        <div className="intro-content">
            <h1 className="page-title">Find the categories of your article</h1>
            <p>Article Classifier helps you find categories that could be suited for your scientific article. 
                Simply insert your article title and the abstract for the best results.</p>

            <p>Article Classifier uses  Natural Language Processing technology ("ScholarBERT" Deep Learning model) to predict the article categories. 
                Results show the categories, which a prediction probability higher than 0.50. </p>
            <div>
            <br/>
            <h3>ScholarBERT Article Category</h3>
            <p></p>
            <p>ScholarBERT can predict follwing article categories.</p>
            <Table columns={colums} dataSource={categories} />
            </div>
        </div>
        )
    }
}

export default About;