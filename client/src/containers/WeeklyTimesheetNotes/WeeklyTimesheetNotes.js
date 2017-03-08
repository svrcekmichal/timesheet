import React, { Component } from 'react';
import Relay from 'react-relay';
import { FormControl, Button } from 'react-bootstrap'
import AddNoteToWeeklyStatus from './../../mutations/AddNoteToWeeklyStatus';
import styled from 'styled-components'

class NewNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.text.length > 5) {
      this.props.onSubmit(this.state.text);
      this.setState({text: "", error: ""});
    } else {
      this.setState({error: "Text must be at least 6chars long"});
    }

  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <FormControl
          type="text"
          placeholder="Press enter to submit"
          value={this.state.text}
          onChange={e => this.setState({text: e.target.value})}
        />
        {this.state.error && (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
      </form>
    )
  }
}

const StyledDT = styled.dt`
  width: 80px !important;
  text-align: left !important;
`

const StyledDD = styled.dd`
  margin-left: 80px !important;
`

export const Notes = ({
  relay,
  me,
  timesheet
}) => (
  <div>
    <h5>Notes</h5>
    {timesheet.notes.pageInfo.hasPreviousPage && (
      <Button bsSize="xsmall" onClick={() => relay.setVariables({last: relay.variables.last + 5})}>Load previous</Button>
    )}
    {timesheet.notes.edges.length > 0 ? (
      <dl className="dl-horizontal">
        {timesheet.notes.edges.map(({node}) => [
          <StyledDT key={`${node.id}_author`}>{node.author.username}</StyledDT>,
          <StyledDD key={`${node.id}_text`}>{node.text}</StyledDD>
        ])}
      </dl>
    ) : (
      <p>No notes found. Be first to add one.</p>
    )}
    {me ? (
      <NewNoteForm onSubmit={message => relay.commitUpdate(new AddNoteToWeeklyStatus({
        message,
        timesheet
      }))} />
    ) : (
      <p>You must be logged to send note</p>
    )}

  </div>
)

export default Relay.createContainer(Notes, {
  initialVariables: {
    last: 5
  },
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        id
      }
    `,
    timesheet: () => Relay.QL`
     fragment on WeeklyTimesheet {
      ${AddNoteToWeeklyStatus.getFragment('timesheet')}      
      notes(last:$last) {
        edges {
          node {
            id
            author {
              username
            }
            text
          }
        }
        pageInfo {
          hasPreviousPage
        }
      }
    }`
  }
})