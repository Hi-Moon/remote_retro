import React from "react"
import { mount, shallow } from "enzyme"
import sinon from "sinon"

import GroupLabelInput from "../../web/static/js/components/group_label_input"

describe("GroupLabelInput component", () => {
  let wrapper
  let groupWithAssociatedIdeasAndVotes

  describe("upon blurring the input field", () => {
    let submitGroupLabelChangesSpy

    beforeEach(() => {
      groupWithAssociatedIdeasAndVotes = {
        id: 777,
        label: "some previous label",
        ideas: [],
        votes: [],
      }

      submitGroupLabelChangesSpy = sinon.spy()
      wrapper = shallow(
        <GroupLabelInput
          groupWithAssociatedIdeasAndVotes={groupWithAssociatedIdeasAndVotes}
          actions={{ submitGroupLabelChanges: submitGroupLabelChangesSpy }}
        />
      )

      const input = wrapper.find("input")
      input.simulate("blur", { target: { value: "Turtles" } })
    })

    it("invokes submitGroupLabelChanges with the group attributes", () => {
      expect(
        submitGroupLabelChangesSpy
      ).to.have.been.calledWith(groupWithAssociatedIdeasAndVotes, "Turtles")
    })
  })

  describe("upon the group label changing", () => {
    it("adds a checkmark next to the label", () => {
      groupWithAssociatedIdeasAndVotes = {
        id: 777,
        label: "some previous label",
        ideas: [],
        votes: [],
      }
      wrapper = mount(
        <GroupLabelInput
          groupWithAssociatedIdeasAndVotes={groupWithAssociatedIdeasAndVotes}
          actions={{}}
        />
      )
      const newGroupWithAssociatedIdeasAndVotes = {
        id: 777,
        label: "a better label",
        ideas: [],
        votes: [],
      }

      expect(wrapper.find(".check")).to.have.lengthOf(0)
      wrapper.setProps({ groupWithAssociatedIdeasAndVotes: newGroupWithAssociatedIdeasAndVotes })
      expect(wrapper.find(".check")).to.have.lengthOf(1)
    })

    it("removes the checkmark after a timeout", () => {
      groupWithAssociatedIdeasAndVotes = {
        id: 777,
        label: "some previous label",
        ideas: [],
        votes: [],
      }
      const clock = sinon.useFakeTimers()
      wrapper = mount(
        <GroupLabelInput
          groupWithAssociatedIdeasAndVotes={groupWithAssociatedIdeasAndVotes}
          actions={{}}
        />
      )
      const newGroupWithAssociatedIdeasAndVotes = {
        id: 777,
        label: "a better label",
        ideas: [],
        votes: [],
      }

      wrapper.setProps({ groupWithAssociatedIdeasAndVotes: newGroupWithAssociatedIdeasAndVotes })
      clock.tick(1999)
      expect(wrapper.find(".check")).to.have.lengthOf(1)
      clock.tick(1)
      wrapper.update()
      expect(wrapper.find(".check")).to.have.lengthOf(0)
      clock.restore()
    })
  })
})
