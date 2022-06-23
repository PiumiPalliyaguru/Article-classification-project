import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getArticleCategory} from '../../util/APIUtils';
import {
    TITLE_MAX_LENGTH, TITLE_MIN_LENGTH,
    ABSTRACT_MAX_LENGTH, ABSTRACT_MIN_LENGTH
} from '../../constants/constant';
import LoadingIndicator from '../../common/LoadingIndicator'

import { Form, Input, Button, Table, notification } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleTitle: {
                value: ''
            },
            articleAbstract: {
                value: ''
            },
            categories: [],
            isLoading: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            isLoading: true,
            categories: []
        });

        try {
            const articleRequest = {
                articleTitle: this.state.articleTitle.value || "",
                articleAbstract: this.state.articleAbstract.value || ""
            };

            // articleRequest.articleTitle.length < 3 &&

            if(articleRequest.articleAbstract.length < 50) {
                notification.error({
                    message: 'Article Classifier',
                    description: 'Invalid artcle data. Article abstract should contain minimum 50 characters.',
                }); 

                this.setState({
                    articleTitle: '',
                    articleAbstract: '',
                    isLoading: false
                });
            } else if(articleRequest.articleAbstract.length > 1500) {
                notification.error({
                    message: 'Article Classifier',
                    description: 'Invalid artcle data. Article abstract should contain maximum 1500 characters.',
                }); 

                this.setState({
                    articleTitle: '',
                    articleAbstract: '',
                    isLoading: false
                });
            }
            else {
                const response = await getArticleCategory(articleRequest);
                this.setState({
                    categories: response,
                    isLoading: false
                })
            }
        } catch (error) {
            notification.error({
                message: 'Article Classifier',
                description: error.message || 'Sorry! Something went wrong. Please try again!',
            }); 

            this.setState({
                articleTitle: '',
                articleAbstract: '',
                categories: [],
                isLoading: false
            });
        }

    }

    isFormInvalid() {
        return (this.state.articleTitle.validateStatus === 'success' &&
            this.state.articleAbstract.validateStatus === 'success'
        );
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
            },
            {
                title: 'Probability',
                dataIndex: 'probability',
                key: 'probability',
            }
        ]


        return (
            <div className="search-container">
                <div className="intro-content">
                    <h2 className="page-title">Find Article Category</h2>
                    <p>Enter title and abstract of your article to easily find categories
                        of the article that belongs to. Article Classifier uses smart search technology
                        and scientific domain(field-of-research)  specific vocabularies to match your
                        article to scientific category.
                    </p>
                    <Link to="/about">{'>'} More on how it works</Link>
                    <br/> <br/>
                </div>
                <div className="search-content">
                    <Form onSubmit={this.handleSubmit} className="search-form">
                        <FormItem
                            label="Article Title"
                            validateStatus={this.state.articleTitle.validateStatus}
                            help={this.state.articleTitle.errorMsg}>
                            <Input
                                size="large"
                                name="articleTitle"
                                autoComplete="off"
                                placeholder="Enter your article title here"
                                value={this.state.articleTitle.value}
                                onChange={(event) => this.handleInputChange(event, this.validateTitle)} />
                        </FormItem>
                        <FormItem
                            label="Article Abstract"
                            validateStatus={this.state.articleAbstract.validateStatus}
                            help={this.state.articleAbstract.errorMsg}>
                            <TextArea
                                autosize={{ minRows: 8, maxRows: 15 }}
                                name="articleAbstract"
                                autoComplete="off"
                                placeholder="Enter your article abstract here"
                                value={this.state.articleAbstract.value}
                                onChange={(event) => this.handleInputChange(event, this.validateAbstaract)} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                className="search-form-button"
                                disabled={this.isFormInvalid()}
                            >Find Category</Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="search-results">
                    {!!categories.length && <Table columns={colums} dataSource={categories} />}
                    {this.state.isLoading ? <LoadingIndicator /> : null}
                </div>
            </div>
        );
    }

    // Validation Functions

    validateTitle = (articleTitle) => {

        if (articleTitle.length < TITLE_MIN_LENGTH) {
            // return {
            //     validationStatus: 'error',
            //     errorMsg: `Ttile is too short (Minimum ${TITLE_MIN_LENGTH} characters allowed.)`,
            // }
            return {
                validationStatus: 'success',
                errorMsg: null,
            };
        } else if (articleTitle.length > TITLE_MAX_LENGTH) {
            // return {
            //     validationStatus: 'error',
            //     errorMsg: `Ttile is too long (Maximum ${TITLE_MAX_LENGTH} characters allowed.)`,
            // }
            return {
                validationStatus: 'success',
                errorMsg: null,
            };

        } else {
            return {
                validationStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateAbstaract = (articleAbstract) => {
        if (articleAbstract.length < ABSTRACT_MIN_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Abstract is too short (Minimum ${ABSTRACT_MIN_LENGTH} characters allowed.)`,
            }
        } else if (articleAbstract.length > ABSTRACT_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Abstract is too long (Maximum ${ABSTRACT_MAX_LENGTH} characters allowed.)`,
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default Search;