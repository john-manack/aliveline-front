import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils'
import ActivitiesList from '../components/ActivitiesList';
import { BrowserRouter as Router } from 'react-router-dom';

describe ('<ActivitiesList />', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("renders local api data", async () => {
        const fakeActivity = [{
            title: "Walter White Return",
            details: "Form 1065 Preparation",
            is_complete: false,
            is_billable:  true,
            is_favorite: false,
            user_sub: "google-oauth2|106823713440282669958"
        }];
        jest.spyOn(global, "fetch").mockImplementation(() => 
            Promise.resolve({
                json: () => Promise.resolve(fakeActivity)
            })
        );

        await act(async () => {
            render(<Router><ActivitiesList /></Router>, container);
        });

        expect(container.textContent).toContain(`User's ActivitiesAdd new activityActivity title *Activity detailsBillableAdd ActivityList of Current Activities${fakeActivity[0].title}Complete? NoSee DetailsPlease select an activity for more details`);

        global.fetch.mockRestore();
    })
})