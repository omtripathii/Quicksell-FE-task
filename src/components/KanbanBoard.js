import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';
import { ReactComponent as PlusIcon } from '../icons_FEtask/add.svg';
import { ReactComponent as DotsIcon } from '../icons_FEtask/3 dot menu.svg';
import { ReactComponent as BacklogIcon } from '../icons_FEtask/Backlog.svg';
import { ReactComponent as CancelledIcon } from '../icons_FEtask/Cancelled.svg';
import { ReactComponent as InProgressIcon } from '../icons_FEtask/in-progress.svg';
import { ReactComponent as TodoIcon } from '../icons_FEtask/To-do.svg';
import { ReactComponent as DoneIcon } from '../icons_FEtask/Done.svg';
import { ReactComponent as NoPriorityIcon } from '../icons_FEtask/No-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../icons_FEtask/Img - Low Priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../icons_FEtask/Img - Medium Priority.svg';
import { ReactComponent as HighPriorityIcon } from '../icons_FEtask/Img - High Priority.svg';
import { ReactComponent as UrgentPriorityIcon } from '../icons_FEtask/SVG - Urgent Priority colour.svg';

export const getStatusIcon = (status) => {
  switch (status) {
    case 'Backlog':
      return <BacklogIcon className="status-icon" />;
    case 'Todo':
      return <TodoIcon className="status-icon" />;
    case 'In progress':
      return <InProgressIcon className="status-icon" />;
    case 'Done':
      return <DoneIcon className="status-icon" />;
    case 'Canceled':
      return <CancelledIcon className="status-icon" />;
    default:
      return <BacklogIcon className="status-icon" />;
  }
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'No priority':
      return <NoPriorityIcon className="priority-icon" />;
    case 'Low':
      return <LowPriorityIcon className="priority-icon" />;
    case 'Medium':
      return <MediumPriorityIcon className="priority-icon" />;
    case 'High':
      return <HighPriorityIcon className="priority-icon" />;
    case 'Urgent':
      return <UrgentPriorityIcon className="priority-icon" />;
    default:
      return null;
  }
};

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const groupTickets = () => {
    const grouped = {};

    if (grouping === 'status') {
      const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
      statusOrder.forEach(status => {
        grouped[status] = tickets.filter(ticket => ticket.status === status);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        grouped[user.name] = tickets.filter(ticket => ticket.userId === user.id);
      });
    } else if (grouping === 'priority') {
      const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      priorityNames.forEach((priority, index) => {
        grouped[priority] = tickets.filter(ticket => ticket.priority === index);
      });
    }

    return grouped;
  };

  const sortTickets = (ticketGroup) => {
    return ticketGroup.sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority;
      } else if (sorting === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedAndSortedTickets = groupTickets();
  Object.keys(groupedAndSortedTickets).forEach(group => {
    groupedAndSortedTickets[group] = sortTickets(groupedAndSortedTickets[group]);
  });

  return (
    <div className="kanban-board">
      {Object.entries(groupedAndSortedTickets).map(([group, tickets]) => (
        <div key={group} className="ticket-column">
          <div className="column-header">
            <div className="header-left">
              {grouping === 'user' && (
                <div className="user-avatar">
                  {group.charAt(0).toUpperCase()}
                  <span className={`availability-indicator ${users.find(u => u.name === group).available ? 'available' : ''}`}></span>
                </div>
              )}
              {grouping === 'status' && getStatusIcon(group)}
              {grouping === 'priority' && getPriorityIcon(group)}
              <h2>{group}</h2>
              <span className="ticket-count">{tickets.length}</span>
            </div>
            <div className="header-right">
              <PlusIcon className="icon" />
              <DotsIcon className="icon" />
            </div>
          </div>
          <div className="ticket-list">
            {tickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                user={users.find(u => u.id === ticket.userId)} 
                grouping={grouping}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
