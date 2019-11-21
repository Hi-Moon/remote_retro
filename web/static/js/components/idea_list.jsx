import React, { Component } from "react"
import countBy from "lodash/countBy"
import FlipMove from "react-flip-move"
import classNames from "classnames"

import Idea from "./idea"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/idea_list.css"
import STAGES from "../configs/stages"

const { ACTION_ITEMS, CLOSED } = STAGES

const sortByVoteCountWithSecondarySortOnIdASC = (votes, ideas) => {
  const voteCountsByIdea = countBy(votes, "idea_id")
  return ideas.sort((a, b) => {
    const voteCountForIdeaA = voteCountsByIdea[a.id] || 0
    const voteCountForIdeaB = voteCountsByIdea[b.id] || 0

    if (voteCountForIdeaB === voteCountForIdeaA) { return a.id - b.id }

    return voteCountForIdeaB - voteCountForIdeaA
  })
}

class IdeaList extends Component {
  constructor(props) {
    super(props)
    const { stage, category } = props
    const sortByVotes = (stage === ACTION_ITEMS || stage === CLOSED) && category !== "action-item"

    this.state = {
      sortByVotes,
    }
  }

  componentDidMount() {
    this.honorScrollabilityOfContent()
    this.scrollabilityInterval = setInterval(this.honorScrollabilityOfContent, 300)
  }

  componentWillReceiveProps(nextProps) {
    const { stage, alert } = this.props
    const actionItemsStageChangeAlertCleared = stage === ACTION_ITEMS && alert && !nextProps.alert

    if (actionItemsStageChangeAlertCleared) {
      this.setState({ sortByVotes: true })
    }
  }

  componentWillUnmount() {
    clearInterval(this.scrollabilityInterval)
  }

  honorScrollabilityOfContent = () => {
    const { list, state } = this

    const overflowed = list.offsetHeight < list.scrollHeight
    if (overflowed !== state.overflowed) {
      this.setState({ overflowed })
    }
  }


  render() {
    const { props, state } = this
    const { category, ideas, votes } = props
    const classes = classNames("ideas", category, styles.list, {
      overflowed: state.overflowed,
    })

    let sortedIdeas
    if (state.sortByVotes) {
      sortedIdeas = sortByVoteCountWithSecondarySortOnIdASC(votes, ideas)
    } else {
      sortedIdeas = ideas.sort((a, b) => a.id - b.id)
    }

    return (
      <ul
        ref={list => { this.list = list }}
        className={classes}
      >
        <FlipMove
          delay={500}
          duration={750}
          staggerDelayBy={100}
          disableAllAnimations={!state.sortByVotes}
          easing="ease"
          enterAnimation="none"
          leaveAnimation="none"
          typeName={null}
        >
          {sortedIdeas.map(idea => <Idea {...this.props} idea={idea} key={idea.id} />)}
        </FlipMove>
      </ul>
    )
  }
}

IdeaList.propTypes = {
  ideas: AppPropTypes.ideas.isRequired,
  category: AppPropTypes.category.isRequired,
  votes: AppPropTypes.votes.isRequired,
  retroChannel: AppPropTypes.retroChannel.isRequired,
  stage: AppPropTypes.stage.isRequired,
  alert: AppPropTypes.alert,
}

IdeaList.defaultProps = {
  alert: null,
}

export default IdeaList
