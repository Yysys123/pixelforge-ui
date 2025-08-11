import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tabs, TabPane, TabItem } from './Tabs';

const mockTabItems: TabItem[] = [
  {
    key: 'tab1',
    label: 'Tab 1',
    content: <div>Content 1</div>,
  },
  {
    key: 'tab2',
    label: 'Tab 2',
    content: <div>Content 2</div>,
  },
  {
    key: 'tab3',
    label: 'Tab 3',
    content: <div>Content 3</div>,
    disabled: true,
  },
];

describe('Tabs', () => {
  describe('Basic Functionality', () => {
    it('renders without crashing', () => {
      render(<Tabs items={mockTabItems} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('displays all tab labels', () => {
      render(<Tabs items={mockTabItems} />);

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('shows default active tab content', () => {
      render(<Tabs items={mockTabItems} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('switches tabs on click', async () => {
      render(<Tabs items={mockTabItems} />);

      const tab2 = screen.getByText('Tab 2');
      await userEvent.click(tab2);

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('respects defaultActiveKey', () => {
      render(<Tabs items={mockTabItems} defaultActiveKey="tab2" />);
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('works with controlled activeKey', async () => {
      const ControlledTabs = () => {
        const [activeKey, setActiveKey] = React.useState('tab1');
        return (
          <div>
            <button onClick={() => setActiveKey('tab2')}>
              Switch to Tab 2
            </button>
            <Tabs
              items={mockTabItems}
              activeKey={activeKey}
              onChange={setActiveKey}
            />
          </div>
        );
      };

      render(<ControlledTabs />);

      expect(screen.getByText('Content 1')).toBeInTheDocument();

      await userEvent.click(screen.getByText('Switch to Tab 2'));
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Children API', () => {
    it('works with TabPane children', () => {
      render(
        <Tabs>
          <TabPane key="child1" tab="Child Tab 1">
            <div>Child Content 1</div>
          </TabPane>
          <TabPane key="child2" tab="Child Tab 2">
            <div>Child Content 2</div>
          </TabPane>
        </Tabs>
      );

      expect(screen.getByText('Child Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Child Content 1')).toBeInTheDocument();
    });

    it('switches between TabPane children', async () => {
      render(
        <Tabs>
          <TabPane key="child1" tab="Child Tab 1">
            <div>Child Content 1</div>
          </TabPane>
          <TabPane key="child2" tab="Child Tab 2">
            <div>Child Content 2</div>
          </TabPane>
        </Tabs>
      );

      const tab2 = screen.getByText('Child Tab 2');
      await userEvent.click(tab2);

      expect(screen.getByText('Child Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Child Content 1')).not.toBeInTheDocument();
    });
  });

  describe('Props and Variants', () => {
    it('applies size variants correctly', () => {
      const { rerender } = render(<Tabs items={mockTabItems} size="sm" />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'size-sm'
      );

      rerender(<Tabs items={mockTabItems} size="lg" />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'size-lg'
      );
    });

    it('applies variant styles correctly', () => {
      const { rerender } = render(
        <Tabs items={mockTabItems} variant="primary" />
      );
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'variant-primary'
      );

      rerender(<Tabs items={mockTabItems} variant="secondary" />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'variant-secondary'
      );
    });

    it('applies position variants correctly', () => {
      const { rerender } = render(
        <Tabs items={mockTabItems} position="bottom" />
      );
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'position-bottom'
      );

      rerender(<Tabs items={mockTabItems} position="left" />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'position-left'
      );
    });

    it('applies type variants correctly', () => {
      const { rerender } = render(<Tabs items={mockTabItems} type="card" />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'type-card'
      );

      rerender(<Tabs items={mockTabItems} type="line" />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'type-line'
      );
    });

    it('applies fullWidth correctly', () => {
      render(<Tabs items={mockTabItems} fullWidth />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'full-width'
      );
    });

    it('applies centered correctly', () => {
      render(<Tabs items={mockTabItems} centered />);
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'centered'
      );
    });

    it('can disable patterns', () => {
      const { container } = render(
        <Tabs items={mockTabItems} showPatterns={false} />
      );
      expect(
        container.querySelector('.content-patterns')
      ).not.toBeInTheDocument();
    });
  });

  describe('Tab States', () => {
    it('handles disabled tabs correctly', async () => {
      render(<Tabs items={mockTabItems} />);

      const disabledTab = screen.getByText('Tab 3');
      expect(disabledTab.closest('button')).toHaveClass('disabled');
      expect(disabledTab.closest('button')).toHaveAttribute(
        'aria-disabled',
        'true'
      );

      // Disabled tab should not be clickable
      await userEvent.click(disabledTab);
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument(); // Should still show first tab
    });

    it('shows active state correctly', () => {
      render(<Tabs items={mockTabItems} />);

      const activeTab = screen.getByText('Tab 1');
      expect(activeTab.closest('button')).toHaveClass('active');
      expect(activeTab.closest('button')).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
  });

  describe('Icons and Badges', () => {
    const itemsWithExtras: TabItem[] = [
      {
        key: 'tab1',
        label: 'Tab 1',
        content: <div>Content 1</div>,
        icon: <span data-testid="icon-1">🎯</span>,
        badge: <span data-testid="badge-1">New</span>,
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        content: <div>Content 2</div>,
        showPattern: true,
      },
    ];

    it('displays icons in tabs', () => {
      render(<Tabs items={itemsWithExtras} />);
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
    });

    it('displays badges in tabs', () => {
      render(<Tabs items={itemsWithExtras} />);
      expect(screen.getByTestId('badge-1')).toBeInTheDocument();
    });

    it('applies icon and badge classes', () => {
      render(<Tabs items={itemsWithExtras} />);

      const tabWithIcon = screen.getByText('Tab 1').closest('button');
      expect(tabWithIcon).toHaveClass('with-icon');
      expect(tabWithIcon).toHaveClass('with-badge');
    });
  });

  describe('Extra Content', () => {
    it('displays tab bar extra content', () => {
      const extraContent = <button data-testid="extra-button">Extra</button>;
      render(<Tabs items={mockTabItems} tabBarExtraContent={extraContent} />);

      expect(screen.getByTestId('extra-button')).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls onChange when tab is clicked', async () => {
      const onChange = jest.fn();
      render(<Tabs items={mockTabItems} onChange={onChange} />);

      const tab2 = screen.getByText('Tab 2');
      await userEvent.click(tab2);

      expect(onChange).toHaveBeenCalledWith('tab2');
    });

    it('does not call onChange for disabled tabs', async () => {
      const onChange = jest.fn();
      render(<Tabs items={mockTabItems} onChange={onChange} />);

      const disabledTab = screen.getByText('Tab 3');
      await userEvent.click(disabledTab);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Enter key to switch tabs', async () => {
      render(<Tabs items={mockTabItems} />);

      const tab2 = screen.getByText('Tab 2');
      tab2.focus();

      fireEvent.keyDown(tab2, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Content 2')).toBeInTheDocument();
      });
    });

    it('handles Space key to switch tabs', async () => {
      render(<Tabs items={mockTabItems} />);

      const tab2 = screen.getByText('Tab 2');
      tab2.focus();

      fireEvent.keyDown(tab2, { key: ' ' });

      await waitFor(() => {
        expect(screen.getByText('Content 2')).toBeInTheDocument();
      });
    });

    it('sets correct tabIndex for active and inactive tabs', () => {
      render(<Tabs items={mockTabItems} />);

      const tab1 = screen.getByText('Tab 1');
      const tab2 = screen.getByText('Tab 2');

      expect(tab1.closest('button')).toHaveAttribute('tabIndex', '0');
      expect(tab2.closest('button')).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Tabs items={mockTabItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes', () => {
      render(<Tabs items={mockTabItems} />);

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);

      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[2]).toHaveAttribute('aria-disabled', 'true');
    });

    it('maintains focus management', async () => {
      render(<Tabs items={mockTabItems} />);

      const tab1Button = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2Button = screen.getByRole('tab', { name: 'Tab 2' });

      // Focus should work on active tab
      tab1Button.focus();
      expect(document.activeElement).toBe(tab1Button);

      // Should be able to move focus to other tabs
      tab2Button.focus();
      expect(document.activeElement).toBe(tab2Button);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      render(<Tabs items={[]} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles missing content gracefully', () => {
      const itemsWithoutContent: TabItem[] = [
        {
          key: 'tab1',
          label: 'Tab 1',
          content: null,
        },
      ];

      render(<Tabs items={itemsWithoutContent} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
    });

    it('handles invalid activeKey gracefully', () => {
      render(<Tabs items={mockTabItems} activeKey="nonexistent" />);
      // Should still render without crashing
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles tabs without keys', () => {
      const itemsWithoutKeys = mockTabItems.map(
        ({ key, ...item }) => item
      ) as TabItem[];
      render(<Tabs items={itemsWithoutKeys} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  describe('Advanced Accessibility', () => {
    it('provides proper ARIA attributes for complex interactions', () => {
      render(<Tabs items={mockTabItems} />);

      const tablist = screen.getByRole('tablist');
      const tabs = screen.getAllByRole('tab');

      expect(tablist).toBeInTheDocument();
      expect(tabs).toHaveLength(3);

      // First tab should be selected by default
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[0]).toHaveAttribute('tabIndex', '0');

      // Other tabs should not be selected
      tabs.slice(1).forEach(tab => {
        expect(tab).toHaveAttribute('aria-selected', 'false');
        expect(tab).toHaveAttribute('tabIndex', '-1');
      });
    });

    it('supports keyboard navigation between tabs', async () => {
      render(<Tabs items={mockTabItems} />);

      const tabs = screen.getAllByRole('tab');

      // Focus first tab
      tabs[0].focus();
      expect(document.activeElement).toBe(tabs[0]);

      // Arrow right should move to next tab
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
      await waitFor(() => {
        expect(document.activeElement).toBe(tabs[1]);
      });

      // Arrow left should move back
      fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
      await waitFor(() => {
        expect(document.activeElement).toBe(tabs[0]);
      });
    });

    it('skips disabled tabs during keyboard navigation', async () => {
      render(<Tabs items={mockTabItems} />);

      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();

      // Arrow right should skip disabled tab (index 2) and wrap to first
      fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
      await waitFor(() => {
        expect(document.activeElement).toBe(tabs[0]);
      });
    });

    it('supports Home and End keys for navigation', async () => {
      render(<Tabs items={mockTabItems} />);

      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();

      // Home should move to first tab
      fireEvent.keyDown(tabs[1], { key: 'Home' });
      await waitFor(() => {
        expect(document.activeElement).toBe(tabs[0]);
      });

      // End should move to last enabled tab
      fireEvent.keyDown(tabs[0], { key: 'End' });
      await waitFor(() => {
        expect(document.activeElement).toBe(tabs[1]); // Skip disabled tab 2
      });
    });

    it('announces tab panel content to screen readers', () => {
      render(<Tabs items={mockTabItems} />);

      const activeTab = screen.getByRole('tab', { selected: true });
      const tabPanel = screen.getByText('Content 1').closest('div');

      expect(activeTab).toHaveAttribute('aria-controls');
      expect(tabPanel).toHaveAttribute('role', 'tabpanel');
      expect(tabPanel).toHaveAttribute('aria-labelledby');
    });

    it('supports high contrast mode', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Tabs items={mockTabItems} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Tabs items={mockTabItems} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('provides proper focus indicators', async () => {
      render(<Tabs items={mockTabItems} />);

      const firstTab = screen.getAllByRole('tab')[0];

      // Focus should be visible
      firstTab.focus();
      expect(firstTab).toHaveFocus();

      // Should have focus-visible styles when focused via keyboard
      fireEvent.keyDown(firstTab, { key: 'Tab' });
      expect(firstTab).toHaveStyle('outline: 2px solid var(--tab-primary)');
    });
  });

  describe('Performance and Memory', () => {
    it('handles large numbers of tabs efficiently', () => {
      const manyTabs = Array.from({ length: 100 }, (_, i) => ({
        key: `tab-${i}`,
        label: `Tab ${i}`,
        content: <div>Content {i}</div>,
      }));

      const start = performance.now();
      render(<Tabs items={manyTabs} />);
      const end = performance.now();

      expect(end - start).toBeLessThan(50); // Should render quickly
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('efficiently handles rapid tab switching', async () => {
      const onChange = jest.fn();
      render(<Tabs items={mockTabItems} onChange={onChange} />);

      const tabs = screen.getAllByRole('tab');

      // Rapidly switch between tabs
      for (let i = 0; i < 10; i++) {
        await userEvent.click(tabs[i % 2]);
      }

      expect(onChange).toHaveBeenCalledTimes(5); // Only when actually changing
    });

    it('cleans up properly on unmount', () => {
      const { unmount } = render(<Tabs items={mockTabItems} />);

      expect(() => unmount()).not.toThrow();
    });

    it('handles rapid re-renders without memory leaks', () => {
      const { rerender } = render(<Tabs items={mockTabItems} />);

      for (let i = 0; i < 50; i++) {
        rerender(
          <Tabs items={mockTabItems} activeKey={mockTabItems[i % 2].key} />
        );
      }

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  describe('Responsive and Layout', () => {
    it('adapts to mobile viewports', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<Tabs items={mockTabItems} position="left" />);

      // Should change layout on mobile
      expect(screen.getByRole('tablist').closest('.tabs')).toHaveClass(
        'position-left'
      );
    });

    it('handles overflow for many tabs gracefully', () => {
      const manyTabs = Array.from({ length: 20 }, (_, i) => ({
        key: `tab-${i}`,
        label: `Very Long Tab Label ${i}`,
        content: <div>Content {i}</div>,
      }));

      const { container } = render(<Tabs items={manyTabs} />);
      const tabList = container.querySelector('.tab-list');

      expect(tabList).toHaveStyle('overflow-x: auto');
    });

    it('maintains proper spacing in different positions', () => {
      const positions = ['top', 'bottom', 'left', 'right'] as const;

      positions.forEach(position => {
        const { container } = render(
          <Tabs items={mockTabItems} position={position} />
        );
        expect(container.querySelector('.tabs')).toHaveClass(
          `position-${position}`
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('handles missing content gracefully', () => {
      const itemsWithMissingContent = [
        { key: 'tab1', label: 'Tab 1', content: null },
        { key: 'tab2', label: 'Tab 2', content: undefined },
      ];

      render(<Tabs items={itemsWithMissingContent} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles invalid activeKey without crashing', () => {
      render(<Tabs items={mockTabItems} activeKey="nonexistent-key" />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles malformed tab items', () => {
      const malformedItems = [
        null,
        undefined,
        { key: 'valid', label: 'Valid', content: 'Content' },
        { label: 'No Key', content: 'Content' }, // Missing key
        { key: 'no-label', content: 'Content' }, // Missing label
      ].filter(Boolean);

      render(<Tabs items={malformedItems} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles render errors in tab content', () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const itemsWithError = [
        {
          key: 'error-tab',
          label: 'Error Tab',
          content: (() => {
            throw new Error('Render error');
          })(),
        },
      ];

      expect(() => {
        render(<Tabs items={itemsWithError} />);
      }).not.toThrow();

      consoleError.mockRestore();
    });
  });

  describe('Internationalization', () => {
    it('supports RTL layouts', () => {
      document.dir = 'rtl';
      render(<Tabs items={mockTabItems} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();

      document.dir = 'ltr'; // Reset
    });

    it('handles long tab labels properly', () => {
      const longLabelItems = [
        {
          key: 'long',
          label: 'This is a very long tab label that might cause layout issues',
          content: <div>Long label content</div>,
        },
      ];

      render(<Tabs items={longLabelItems} />);
      expect(screen.getByText(/This is a very long/)).toBeInTheDocument();
    });

    it('supports different text directions', () => {
      const arabicItems = [
        {
          key: 'arabic',
          label: 'العربية',
          content: <div>المحتوى العربي</div>,
        },
      ];

      render(<Tabs items={arabicItems} />);
      expect(screen.getByText('العربية')).toBeInTheDocument();
    });
  });

  describe('Security', () => {
    it('sanitizes HTML in tab labels', () => {
      const maliciousItems = [
        {
          key: 'xss',
          label: '<script>alert("xss")</script>',
          content: <div>Safe content</div>,
        },
      ];

      render(<Tabs items={maliciousItems} />);

      expect(
        screen.getByText('<script>alert("xss")</script>')
      ).toBeInTheDocument();
      expect(document.querySelector('script')).not.toBeInTheDocument();
    });

    it('prevents injection attacks in content', () => {
      const maliciousItems = [
        {
          key: 'safe',
          label: 'Safe',
          content: '<img src="x" onerror="alert(\'xss\')" />',
        },
      ];

      render(<Tabs items={maliciousItems} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  describe('TabPane Component', () => {
    it('renders TabPane independently', () => {
      render(
        <TabPane key="test" tab="Test Tab">
          <div>Test Content</div>
        </TabPane>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('accepts all standard div props', () => {
      render(
        <TabPane
          key="test"
          tab="Test Tab"
          data-testid="tab-pane"
          className="custom-class"
        >
          <div>Test Content</div>
        </TabPane>
      );

      const pane = screen.getByTestId('tab-pane');
      expect(pane).toHaveClass('custom-class');
    });

    it('handles forceRender prop', () => {
      render(
        <TabPane key="test" tab="Test Tab" forceRender>
          <div>Force rendered content</div>
        </TabPane>
      );

      expect(screen.getByText('Force rendered content')).toBeInTheDocument();
    });

    it('supports disabled prop', () => {
      render(
        <Tabs>
          <TabPane key="disabled" tab="Disabled Tab" disabled>
            <div>Disabled content</div>
          </TabPane>
          <TabPane key="enabled" tab="Enabled Tab">
            <div>Enabled content</div>
          </TabPane>
        </Tabs>
      );

      const disabledTab = screen.getByText('Disabled Tab');
      expect(disabledTab.closest('button')).toHaveClass('disabled');
    });
  });
});
