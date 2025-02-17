import React from "react";
import { shallow } from "enzyme";
import { createBrowserHistory } from "history";

import {
	getAllPost,
	createPost,
	toggleCreatePost,
	searchPost,
} from "./post";
import { onChange } from "./textEditor";
import { DiscussionHead } from "./DiscussionHead";
import ContentEditorConnected, {ContentEditor} from "./ContentEditor";


const history = createBrowserHistory();
jest.spyOn(history, "push");

// Set state calls from parent
const setPageMock = jest.fn()
const setIsSearchMock = jest.fn()

const initialProps = {
    loading: false,
    edit: false,
    setPage: setPageMock,
    setIsSearch: setIsSearchMock,
    getAllPost,
	contentState: {},
	createPost,
	toggleCreatePost,
	history,
	searchPost,
}


const setup = (props = {}) => {
	const setupProps = { ...initialProps, ...props };
	return shallow(<DiscussionHead {...setupProps} />);
};


describe('render Discussion editor when edit is true', () => {
	const toggleCreatePostMock = jest.fn()
	const wrapper = setup({ edit: true, toggleCreatePost: toggleCreatePostMock });
	const discussionEditor = wrapper.find(".Discussion__editor");

	// ContentEditor wrapper
	const contentEditorProps =discussionEditor.find(ContentEditorConnected).props();
	const contentEditorWrapper = shallow(<ContentEditor {...contentEditorProps} onChange={onChange}/>)

	test('change input title then handle toggle should reset title and call handle toggle', () => {
		// Test contentEditor component with discussion head parent props
		// Change text
		contentEditorWrapper.find("#title").simulate("change",
			{ target: { value: "test typing" } })
		expect(wrapper.find(ContentEditorConnected).props().title).toBe("test typing1")
		// Handle toggle shoulpd reset title and call toggleCreatePost
		contentEditorWrapper.find(".btn__cancel").simulate("click")
		expect(wrapper.find(ContentEditorConnected).props().title).toBe("")
		expect(toggleCreatePostMock.mock.calls.length).toBe(1);
	})
	
	
})





