# TUI Manual Testing Checklist

This checklist attempts to capture every scenario that should be manually tested after working on big features, refactors, or package updates to ensure the app is still working properly.

### Browsers

Please perform the check on all of the browsers you have access to below

- [ ] Firefox
- [ ] Google Chrome

### Tests

####**Search Functionality**

- [ ] Make a search that is likely to return some results, e.g. 'setting' and see if the search results display properly.
- [ ] Click into a few different Tasks to make sure the linking works.

####**Find Functionality**

- [ ] Enter a few different task IDs to make sure the Find By ID function takes you to the correct page, here are some that you can use:
- Inversion Solution: `SW52ZXJzaW9uU29sdXRpb246Mjk2MS4wREtva2Q=`
- Automation Task:` QXV0b21hdGlvblRhc2s6MTIzOFRhNDJt`
- General Task: `R2VuZXJhbFRhc2s6MTIzN1NFQWtz`

####**General Task**
**Filter, Report/list toggle, General Reports**
go to this general task for test db: `R2VuZXJhbFRhc2s6MTA1NW40b3Vj`

- [ ] Set your environment variable `REACT_APP_REPORTS_LIMIT=12`
- [ ] Without applying filter, there should be 32 child tasks listed, click `show report`, there should be an alert that pops up saying:
  > Cannot Query Reports
  > Reports cannot be queried when the list of filtered child tasks is over 8.
- [ ] Click the `Filter` button, a drop down select menu should occur.
- [ ] Select one item from the first drop down, hit apply. Now the child tasks count should be `16/32`. The same Alert from above should pop up.
- [ ] Select one item from the second drop down, hit apply. Now the child task count should be `8/32`. No alert should occur.
- [ ] Click the `Show Report` button, a query would be ran you will be on the `General` tab.
- [ ] Select some options from the `Reports` drop down, the corresponding graphs should show up.
- [ ] Check your local storage in your browser dev tools, the selection should update as you select / deselect.
- [ ] Check the other tabs, they should all be diabled (unclickable).'
- [ ] With some report options selected, click share button, copy the url and paste it into a private browser, you should get a page that loads all your filter and report settings.
- [ ] Try resizing the browser and check that everything looks ok.

**Regional Solutions & Named Faults**
Go to this General Task, click `CHILD TASKS`, click `Show Report`.

- [ ] All the tabs should have been enabled.
- [ ] Perform the same check for local storage for `Regional Solutions` and `Named Faults`.
- [ ] Do the same sharing url check as above.
- [ ] Try resizing the browser and check that everything looks ok.

**Hazard Curves**
On the same General Task as above,

- [ ] Click `HAZARD CHARTS`, you should see a xy chart with some drop down selections on top.
- [ ] Select all the `PGA/SA Period` options, more curves should come up with legend corresponding their colors.
- [ ] With each location, check both of the two `Background Seismicity` options look good.
- [ ] With each location, check both of the two `Probability of Exceedence` options, the UHS plot should come up on the right and change corresponding to `2%` and `10%`, and disppear if you choose `None`.
- Try resizing the browser and check that everything looks ok.

**Parent Faults**
Go to this general task on test db: `SW52ZXJzaW9uU29sdXRpb246Mjk2MS4wREtva2Q=`

- [ ] Go to the `Parent Faults` tab, you should be able to see the reports depending on your selections.
- [ ] Your changes should update in Local Storage

**Favourites**
On the same General Task report view,
- [ ] add an Inversion Solution to your favourites by clikcing the fist button. It should change color.
- [ ] go the My Solutions Page, and check that this has now occured in your list of favourites

####**My Solutions Page**

- [ ] Click the `save` button on this page, copy the JSON into your clicpboard. Then open the My Solutions page in a private window, the list should be empty. Cick `load` and paste the JSON into the input window. You should now have a list of favourites identical to your local one. 
- [ ] Click `show report` and make sure things work property.
- [ ] Resize your browser window and make sure everything looks ok.