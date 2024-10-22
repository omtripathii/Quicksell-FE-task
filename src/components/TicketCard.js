import React from 'react';
import './TicketCard.css';
import { ReactComponent as UrgentIcon } from '../icons_FEtask/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighIcon } from '../icons_FEtask/Img - High Priority.svg';
import { ReactComponent as MediumIcon } from '../icons_FEtask/Img - Medium Priority.svg';
import { ReactComponent as LowIcon } from '../icons_FEtask/Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from '../icons_FEtask/No-priority.svg';
import { getStatusIcon } from './KanbanBoard';

function TicketCard({ ticket, user, grouping }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return <UrgentIcon className="priority-icon" />;
      case 3: return <HighIcon className="priority-icon" />;
      case 2: return <MediumIcon className="priority-icon" />;
      case 1: return <LowIcon className="priority-icon" />;
      default: return <NoPriorityIcon className="priority-icon" />;
    }
  };

  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
            <span className={`availability-indicator ${user.available ? 'available' : ''}`}></span>
          </div>
        )}
      </div>
      <div className="ticket-title">
        {grouping !== 'status' && getStatusIcon(ticket.status)}
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-footer">
        <div className="priority-icon-wrapper">
          {getPriorityIcon(ticket.priority)}
        </div>
        <div className="ticket-tag">
          <span className="tag-dot"></span>
          {ticket.tag}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
