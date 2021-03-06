import * as React from 'react'
import { Step, NavActionEnum } from './types'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button/Button'

export interface NavButtonsProps {
  isWizardMode?: boolean
  previousStepIds: string[]
  onNavAction: Function
  steps: Step[]
  currentStep: Step
  isFormSubmitted?: boolean
  isNoSaveButton?: boolean
}

export interface NextStepLinkProps {
  onNavAction: Function
  steps: Step[]
  nextStepId: string | undefined
}

export function NavButtons(props: NavButtonsProps): JSX.Element {
  // in wizard mode we build an array of the previous steps. In regular mode back goes to
  // a previous order step
  const canGoBack = (props: NavButtonsProps): boolean => {
    if (props.isWizardMode) {
      return props.previousStepIds && props.previousStepIds.length > 0
    } else {
      return props.steps.findIndex(step => step.id === props.currentStep.id) > 0
    }
  }

  const previousButton = canGoBack(props) ? (
    <Button 
      onClick={e => props.onNavAction(NavActionEnum.PREVIOUS)}
     color = "primary"
     variant="contained"
     
    >
      <FontAwesomeIcon icon={faChevronLeft} />&nbsp;
      </Button>
   
  ) : (
    <></>
  )

  const nextButton = props.currentStep.default ? (
    <Button 
      onClick={e => props.onNavAction(NavActionEnum.NEXT)}
     color="primary"
     variant="contained"
    >
      &nbsp;<FontAwesomeIcon icon={faChevronRight} />
      </Button>
  ) : (
   /* props.isNoSaveButton?*/ 
      <Button 
      color="primary"
      className="submit"
      variant="contained"
      disabled={props.isFormSubmitted}
      onClick={e => props.onNavAction(NavActionEnum.SUBMIT)}
    >
      Submit
    </Button>
  
  )

  const saveButton = (!props.currentStep.final && !props.isNoSaveButton && props.steps.length > 1) ?(
    <Button 
    color="primary"
    className="save"
    variant="text"
    
      disabled={props.isFormSubmitted}
      onClick={e => props.onNavAction(NavActionEnum.SAVE)}
    >
      Save progress
      </Button>
  ): (
    <></>
  )

  return (
    <div className="padded-panel">
      <div className="buttonWrapper" style={{overflow:'visible'}}>
        {previousButton} {nextButton}
      </div>
      <div  className="text-right" style={{clear:'both'}}>
      {saveButton}
      </div>
    </div>
  )
}

export function NextStepLink(props: NextStepLinkProps): JSX.Element {
  const nextStep = props.steps.find(step => step.id === props.nextStepId)
  if (typeof nextStep === 'undefined') {
    return <></>
  }
  return (
    <span className="nav-link">
      <a href="#" onClick={e => props.onNavAction(nextStep)}>{nextStep.title}</a>
      &nbsp;<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
    </span>
  )
}
