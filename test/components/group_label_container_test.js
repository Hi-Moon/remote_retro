import React from "react"
import { shallow } from "enzyme"

import GroupLabelContainer from "../../web/static/js/components/group_label_container"

describe("GroupLabelContainer component", () => {
  const defaultProps = {
    actions: {},
    currentUser: {},
    stage: "closed",
    groupWithAssociatedIdeasAndVotes: {
      id: 5,
      label: "Internet Culture",
      ideas: [],
    },
  }

  context("when the user is a facilitator", () => {
    let wrapper

    context("when the stage is 'labeling-plus-voting'", () => {
      beforeEach(() => {
        wrapper = shallow(
          <GroupLabelContainer
            {...defaultProps}
            currentUser={{ is_facilitator: true }}
            stage="labeling-plus-voting"
          />
        )
      })

      it("renders an input for the group label", () => {
        const input = wrapper.find("GroupLabelInput")

        expect(input.length).to.eql(1)
      })

      it("does *not* render the group label in a paragraph tag", () => {
        const labelParagraphTag = wrapper.find("p").findWhere(pTag => pTag.text() === "Internet Culture")

        expect(labelParagraphTag.exists()).to.equal(false)
      })
    })

    context("when the stage is something other than 'labeling-plus-voting'", () => {
      beforeEach(() => {
        wrapper = shallow(
          <GroupLabelContainer
            {...defaultProps}
            currentUser={{ is_facilitator: true }}
            stage="closed"
          />
        )
      })

      it("does *not* render an input for the group label", () => {
        const input = wrapper.find("GroupLabelInput")

        expect(input.length).to.eql(0)
      })

      it("renders the group label in a paragraph tag", () => {
        const labelParagraphTag = wrapper.find("p").findWhere(pTag => pTag.text() === "Internet Culture")

        expect(labelParagraphTag.exists()).to.equal(true)
      })
    })
  })

  context("when the user is not a facilitator", () => {
    let wrapper

    before(() => {
      wrapper = shallow(
        <GroupLabelContainer {...defaultProps} currentUser={{ is_facilitator: false }} />
      )
    })

    it("does not render an input field", () => {
      const input = wrapper.find("GroupLabelInput")

      expect(input.length).to.eql(0)
    })

    it("renders the group label as text", () => {
      const labelParagraphTag = wrapper.find("p").findWhere(pTag => pTag.text() === "Internet Culture")

      expect(labelParagraphTag.exists()).to.equal(true)
    })
  })
})